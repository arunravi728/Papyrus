---
title: Publishing Your Vault Online
share: true
---

### Main Tools

* Quartz - Generates static websites from markdown.
  * Very simple if you want everything in your vault published (uses a GitHub action).
  * I have private content - cannot use the default GitHub action!
* Obsidian Export - Allows selective inclusion/exclusion of obsidian files.
  * Converts obsidian into standard-compliant markdown.
* Obsidian Hugo - Used by the Quartz GitHub action.
  * Can be precompiled before uploading to GitHub.
* GitHub Pages - Static webpage hosting offered by GitHub.

### Steps to Obsidian Publish Vault (on a MAC)

Install `Node` and `npm` on your machine. This is required for running Quartz.

````bash
# Install node and mpm
brew update
brew install node

# Query version
node -v
npm -v

# Install nodemon -> needed to check for changes to the Obsidian vault.
npm install -g nodemon
nodemon -v
````

Clone [quartz](https://github.com/jackyzha0/quartz) locally. The `contents/` folder inside Quartz is the data that is going to be publicly displayed. You will want to sync the new quartz directory with GitHub. Follow these [steps](https://quartz.jzhao.xyz/setting-up-your-GitHub-repository).

In the quartz directory, add the [compile](https://github.com/brandonkboswell/quartz/blob/hugo/compile.sh) scripts. The compile script first empties the contents of quartz. It then uses the obsidian exporter to only export allowed files. Add a `.export-ignore` file to the root Obsidian vault. This is similar to `.gitignore`. Used for selectively excluding files from being exported. Note that this file cannot be created in Obsidian as it starts with a `.`. You will have to create/edit it in an IDE.

Build and preview the website before pushing to GitHub. Can be done by running - `npx quartz build --serve`. Pushing to GitHub can be done using `npx quartz sync`.

 > 
 > \[!Warning\] Quartz does not natively support DataView and Excalidraw. Refer [GitHub Publisher](./GitHub%20Publisher.md).

For more advanced modifications, refer [Quartz](Quartz.md).

### References

1. [Quartz Website](https://quartz.jzhao.xyz)
1. [Brandon Boswell's video on setting up Quartz](https://youtu.be/ITiiuBNVue0?feature=shared)
1. [Nicole's video on setting up Quartz](https://www.youtube.com/watch?v=6s6DT1yN4dw)
