import FlexSearch from "flexsearch"
import { ContentDetails } from "../../plugins/emitters/contentIndex"
import { registerEscapeHandler, removeAllChildren } from "./util"
import { FullSlug, normalizeRelativeURLs, resolveRelative } from "../../util/path"

interface Item {
  id: number
  slug: FullSlug
  title: string
  content: string
  tags: string[]
}

type SearchType = "basic" | "tags"
let searchType: SearchType = "basic"
let currentSearchTerm: string = ""
const encoder = (str: string) => str.toLowerCase().split(/([^a-z]|[^\x00-\x7F])/)
let index = new FlexSearch.Document<Item>({
  charset: "latin:extra",
  encode: encoder,
  document: {
    id: "id",
    tag: "tags",
    index: [
      { field: "title", tokenize: "forward" },
      { field: "content", tokenize: "forward" },
      { field: "tags", tokenize: "forward" },
    ],
  },
})

const p = new DOMParser()
const fetchContentCache: Map<FullSlug, Element[]> = new Map()
const contextWindowWords = 30
const numSearchResults = 8
const numTagResults = 5

const tokenizeTerm = (term: string) => {
  const tokens = term.split(/\s+/).filter((t) => t.trim() !== "")
  const tokenLen = tokens.length
  if (tokenLen > 1) {
    for (let i = 1; i < tokenLen; i++) {
      tokens.push(tokens.slice(0, i + 1).join(" "))
    }
  }
  return tokens.sort((a, b) => b.length - a.length)
}

function highlight(searchTerm: string, text: string, trim?: boolean) {
  const tokenizedTerms = tokenizeTerm(searchTerm)
  let tokenizedText = text.split(/\s+/).filter((t) => t !== "")

  let startIndex = 0
  let endIndex = tokenizedText.length - 1
  if (trim) {
    const includesCheck = (tok: string) =>
      tokenizedTerms.some((term) => tok.toLowerCase().startsWith(term.toLowerCase()))
    const occurrencesIndices = tokenizedText.map(includesCheck)

    let bestSum = 0
    let bestIndex = 0
    for (let i = 0; i < Math.max(tokenizedText.length - contextWindowWords, 0); i++) {
      const window = occurrencesIndices.slice(i, i + contextWindowWords)
      const windowSum = window.reduce((total, cur) => total + (cur ? 1 : 0), 0)
      if (windowSum >= bestSum) {
        bestSum = windowSum
        bestIndex = i
      }
    }

    startIndex = Math.max(bestIndex - contextWindowWords, 0)
    endIndex = Math.min(startIndex + 2 * contextWindowWords, tokenizedText.length - 1)
    tokenizedText = tokenizedText.slice(startIndex, endIndex)
  }

  const slice = tokenizedText
    .map((tok) => {
      for (const searchTok of tokenizedTerms) {
        if (tok.toLowerCase().includes(searchTok.toLowerCase())) {
          const regex = new RegExp(searchTok.toLowerCase(), "gi")
          return tok.replace(regex, `<span class="highlight">$&</span>`)
        }
      }
      return tok
    })
    .join(" ")

  return `${startIndex === 0 ? "" : "..."}${slice}${
    endIndex === tokenizedText.length - 1 ? "" : "..."
  }`
}

function highlightHTML(searchTerm: string, el: HTMLElement) {
  const p = new DOMParser()
  const tokenizedTerms = tokenizeTerm(searchTerm)
  const html = p.parseFromString(el.innerHTML, "text/html")

  const createHighlightSpan = (text: string) => {
    const span = document.createElement("span")
    span.className = "highlight"
    span.textContent = text
    return span
  }

  const highlightTextNodes = (node: Node, term: string) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const nodeText = node.nodeValue ?? ""
      const regex = new RegExp(term.toLowerCase(), "gi")
      const matches = nodeText.match(regex)
      if (!matches || matches.length === 0) return
      const spanContainer = document.createElement("span")
      let lastIndex = 0
      for (const match of matches) {
        const matchIndex = nodeText.indexOf(match, lastIndex)
        spanContainer.appendChild(document.createTextNode(nodeText.slice(lastIndex, matchIndex)))
        spanContainer.appendChild(createHighlightSpan(match))
        lastIndex = matchIndex + match.length
      }
      spanContainer.appendChild(document.createTextNode(nodeText.slice(lastIndex)))
      node.parentNode?.replaceChild(spanContainer, node)
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if ((node as HTMLElement).classList.contains("highlight")) return
      Array.from(node.childNodes).forEach((child) => highlightTextNodes(child, term))
    }
  }

  for (const term of tokenizedTerms) {
    highlightTextNodes(html.body, term)
  }

  return html.body
}

document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
  const currentSlug = e.detail.url
  const data = await fetchData
  const idDataMap = Object.keys(data) as FullSlug[]

  const searchContainers = document.querySelectorAll<HTMLElement>(".search-container")
  const searchIcons = document.querySelectorAll<HTMLElement>(".search-icon")
  const searchBars = document.querySelectorAll<HTMLInputElement>(".search-bar")

  // New setup to handle multiple search instances
  const searchInstances = Array.from(document.querySelectorAll<HTMLElement>(".search")).map(
    (searchComponent) => {
      return {
        component: searchComponent,
        container: searchComponent.querySelector<HTMLElement>(".search-container"),
        icon: searchComponent.querySelector<HTMLElement>(".search-icon"),
        bar: searchComponent.querySelector<HTMLInputElement>(".search-bar"),
        layout: searchComponent.querySelector<HTMLElement>(".search-layout"),
        results: null as HTMLDivElement | null,
        preview: null as HTMLDivElement | null,
      }
    },
  )

  function hideSearch() {
    searchInstances.forEach((instance) => {
      const { container, bar, layout, results, preview } = instance
      container?.classList.remove("active")
      if (bar) bar.value = ""
      const sidebar = container?.closest(".sidebar") as HTMLElement
      if (sidebar) sidebar.style.zIndex = "unset"
      if (results) removeAllChildren(results)
      if (preview) removeAllChildren(preview)
      layout?.classList.remove("display-results")
    })
    searchType = "basic"
  }

  function showSearch(searchTypeNew: SearchType) {
    searchType = searchTypeNew
    searchInstances.forEach((instance) => {
      const { container, bar } = instance
      const sidebar = container?.closest(".sidebar") as HTMLElement
      if (sidebar) sidebar.style.zIndex = "1"
      container?.classList.add("active")

      // Only focus the visible search bar
      if (bar && window.getComputedStyle(bar).display !== "none") {
        bar.focus()
      }
    })
  }

  let currentHover: HTMLInputElement | null = null

  async function shortcutHandler(e: HTMLElementEventMap["keydown"]) {
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      const searchOpen = searchInstances.some((i) => i.container?.classList.contains("active"))
      searchOpen ? hideSearch() : showSearch(e.shiftKey ? "tags" : "basic")
      if (!searchOpen && e.shiftKey) {
        searchBars.forEach((bar) => (bar.value = "#"))
      }
      return
    }

    const activeContainer = searchInstances.find((i) =>
      i.container?.classList.contains("active"),
    )?.container
    if (!activeContainer) return

    const results = activeContainer.querySelector<HTMLElement>(".results-container")

    if (currentHover) {
      currentHover.classList.remove("focus")
    }

    if (e.key === "Enter") {
      const focusedResult = results?.querySelector<HTMLInputElement>(":focus")
      if (focusedResult) {
        focusedResult.click()
      } else {
        const firstResult = results?.querySelector<HTMLInputElement>(".result-card:not(.no-match)")
        firstResult?.click()
      }
    } else if (e.key === "ArrowUp" || (e.shiftKey && e.key === "Tab")) {
      e.preventDefault()
      const currentResult =
        currentHover ?? (document.activeElement as HTMLInputElement | null)
      const prevResult = currentResult?.previousElementSibling as HTMLInputElement | null
      prevResult?.focus()
      if (prevResult) currentHover = prevResult
      await displayPreview(prevResult, activeContainer)
    } else if (e.key === "ArrowDown" || e.key === "Tab") {
      e.preventDefault()
      const currentResult =
        currentHover ?? (document.activeElement as HTMLInputElement | null)
      if (currentResult?.classList.contains("search-bar")) {
        const firstResult =
          results?.querySelector<HTMLInputElement>(".result-card:not(.no-match)")
        firstResult?.focus()
        if (firstResult) currentHover = firstResult
        await displayPreview(firstResult, activeContainer)
      } else {
        const nextResult = currentResult?.nextElementSibling as HTMLInputElement | null
        nextResult?.focus()
        if (nextResult) currentHover = nextResult
        await displayPreview(nextResult, activeContainer)
      }
    }
  }

  const formatForDisplay = (term: string, id: number) => {
    const slug = idDataMap[id]
    return {
      id,
      slug,
      title: searchType === "tags" ? data[slug].title : highlight(term, data[slug].title ?? ""),
      content: highlight(term, data[slug].content ?? "", true),
      tags: highlightTags(term.substring(1), data[slug].tags),
    }
  }

  function highlightTags(term: string, tags: string[]) {
    if (!tags || searchType !== "tags") return []
    return tags
      .map((tag) =>
        tag.toLowerCase().includes(term.toLowerCase())
          ? `<li><p class="match-tag">#${tag}</p></li>`
          : `<li><p>#${tag}</p></li>`,
      )
      .slice(0, numTagResults)
  }

  function resolveUrl(slug: FullSlug): URL {
    return new URL(resolveRelative(currentSlug, slug), location.toString())
  }

  const resultToHTML = (item: Item, searchContainer: HTMLElement) => {
    const { slug, title, content, tags } = item
    const htmlTags = tags.length > 0 ? `<ul class="tags">${tags.join("")}</ul>` : ""
    const enablePreview = searchContainer.querySelector(".search-layout")?.dataset.preview === "true"

    const itemTile = document.createElement("a")
    itemTile.classList.add("result-card")
    itemTile.id = slug
    itemTile.href = resolveUrl(slug).toString()
    itemTile.innerHTML = `<h3>${title}</h3>${htmlTags}${
      enablePreview && window.innerWidth > 600 ? "" : `<p>${content}</p>`
    }`

    itemTile.addEventListener("click", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      hideSearch()
    })

    itemTile.addEventListener("mouseenter", async (ev) => {
      if (!ev.target) return
      await displayPreview(ev.target as HTMLElement, searchContainer)
    })

    return itemTile
  }

  async function displayResults(finalResults: Item[], searchContainer: HTMLElement) {
    const resultsContainer = searchContainer.querySelector<HTMLElement>(".results-container")
    if (!resultsContainer) return

    removeAllChildren(resultsContainer)
    if (finalResults.length === 0) {
      resultsContainer.innerHTML = `<a class="result-card no-match"><h3>No results.</h3><p>Try another search term?</p></a>`
    } else {
      resultsContainer.append(...finalResults.map((res) => resultToHTML(res, searchContainer)))
    }

    const previewContainer = searchContainer.querySelector<HTMLElement>(".preview-container")
    if (finalResults.length === 0 && previewContainer) {
      removeAllChildren(previewContainer)
    } else {
      const firstChild = resultsContainer.firstElementChild as HTMLElement
      firstChild.classList.add("focus")
      currentHover = firstChild as HTMLInputElement
      await displayPreview(firstChild, searchContainer)
    }
  }

  async function fetchContent(slug: FullSlug): Promise<Element[]> {
    if (fetchContentCache.has(slug)) {
      return fetchContentCache.get(slug) as Element[]
    }

    const targetUrl = resolveUrl(slug).toString()
    const contents = await fetch(targetUrl)
      .then((res) => res.text())
      .then((contents) => {
        if (contents === undefined) throw new Error(`Could not fetch ${targetUrl}`)
        const html = p.parseFromString(contents ?? "", "text/html")
        normalizeRelativeURLs(html, targetUrl)
        return [...html.getElementsByClassName("popover-hint")]
      })

    fetchContentCache.set(slug, contents)
    return contents
  }

  async function displayPreview(el: HTMLElement | null, searchContainer: HTMLElement) {
    if (!el) return
    const layout = searchContainer.querySelector<HTMLElement>(".search-layout")
    const previewContainer = searchContainer.querySelector<HTMLElement>(".preview-container")
    const enablePreview = layout?.dataset?.preview === "true"

    if (!layout || !enablePreview || !previewContainer) return

    const slug = el.id as FullSlug
    const innerDiv = await fetchContent(slug).then((contents) =>
      contents.flatMap((el) => [...highlightHTML(currentSearchTerm, el as HTMLElement).children]),
    )
    const previewInner = document.createElement("div")
    previewInner.classList.add("preview-inner")
    previewInner.append(...innerDiv)
    previewContainer.replaceChildren(previewInner)

    const highlights = [...previewContainer.querySelectorAll(".highlight")].sort(
      (a, b) => b.innerHTML.length - a.innerHTML.length,
    )
    highlights[0]?.scrollIntoView({ block: "start" })
  }

  async function onType(e: HTMLElementEventMap["input"]) {
    const searchBar = e.target as HTMLInputElement
    const searchComponent = searchBar.closest(".search")
    if (!searchComponent) return

    const searchContainer = searchComponent.querySelector<HTMLElement>(".search-container")
    const searchLayout = searchComponent.querySelector<HTMLElement>(".search-layout")
    if (!searchLayout || !searchContainer) return

    currentSearchTerm = searchBar.value
    searchLayout.classList.toggle("display-results", currentSearchTerm !== "")
    searchType = currentSearchTerm.startsWith("#") ? "tags" : "basic"

    let searchResults: FlexSearch.SimpleDocumentSearchResultSetUnit[]
    if (searchType === "tags") {
      currentSearchTerm = currentSearchTerm.substring(1).trim()
      const separatorIndex = currentSearchTerm.indexOf(" ")
      if (separatorIndex !== -1) {
        const tag = currentSearchTerm.substring(0, separatorIndex)
        const query = currentSearchTerm.substring(separatorIndex + 1).trim()
        searchResults = await index.searchAsync({
          query,
          limit: Math.max(numSearchResults, 10000),
          index: ["title", "content"],
          tag,
        })
        searchResults.forEach((res) => (res.result = res.result.slice(0, numSearchResults)))
        searchType = "basic"
        currentSearchTerm = query
      } else {
        searchResults = await index.searchAsync({
          query: currentSearchTerm,
          limit: numSearchResults,
          index: ["tags"],
        })
      }
    } else {
      searchResults = await index.searchAsync({
        query: currentSearchTerm,
        limit: numSearchResults,
        index: ["title", "content"],
      })
    }

    const getByField = (field: string): number[] => {
      const results = searchResults.filter((x) => x.field === field)
      return results.length === 0 ? [] : [...results[0].result]
    }

    const allIds: Set<number> = new Set([...getByField("title"), ...getByField("content"), ...getByField("tags")])
    const finalResults = [...allIds].map((id) => formatForDisplay(currentSearchTerm, id))
    await displayResults(finalResults, searchContainer)
  }

  // Initial setup for all instances
  searchInstances.forEach((instance) => {
    const { component, layout } = instance
    if (!layout) return

    const enablePreview = layout.dataset?.preview === "true"
    const results = document.createElement("div")
    results.classList.add("results-container")
    instance.results = results
    layout.appendChild(results)

    if (enablePreview) {
      const preview = document.createElement("div")
      preview.classList.add("preview-container")
      instance.preview = preview
      layout.appendChild(preview)
    }
  })

  // Add all event listeners
  document.addEventListener("keydown", shortcutHandler)
  searchIcons.forEach((icon) => icon.addEventListener("click", () => showSearch("basic")))
  searchBars.forEach((bar) => bar.addEventListener("input", onType))
  searchContainers.forEach((container) => registerEscapeHandler(container, hideSearch))

  // Cleanup old listeners on page navigation
  window.addCleanup(() => {
    document.removeEventListener("keydown", shortcutHandler)
    searchIcons.forEach((icon) => icon.removeEventListener("click", () => showSearch("basic")))
    searchBars.forEach((bar) => bar.removeEventListener("input", onType))
  })

  await fillDocument(data)
})

async function fillDocument(data: { [key: FullSlug]: ContentDetails }) {
  let id = 0
  for (const [slug, fileData] of Object.entries<ContentDetails>(data)) {
    await index.addAsync(id++, {
      id,
      slug: slug as FullSlug,
      title: fileData.title,
      content: fileData.content,
      tags: fileData.tags,
    })
  }
}
