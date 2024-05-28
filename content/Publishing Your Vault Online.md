---
title: Publishing Your Vault Online
created: Sunday - 29th October, 2023
updated: Sunday - 29th October, 2023
consumed: 1
share: true
---

Self Link: [Publishing Your Vault Online](Publishing%20Your%20Vault%20Online.md)

##### Main Tools

* Quartz - Generates static websites from markdown.
  * Very simple if you want everything in your vault published (uses a GitHub action).
  * I have private content - cannot use the default GitHub action!
* Obsidian Export - Allows selective inclusion / exclusion of obsidian files.
  * Converts obsidian into standard compliant markdown.
* Obsidian Hugo - Used by the quartz GitHub action.
  * Can be precompiled before uploading to GitHub.
* GitHub Pages - Static webpage hosting offered by GitHub.

##### Steps to Obsidian Publish Vault (on a MAC)

Install `Node` and `npm` on your machine. This is required for running Quartz.

````bash
# Install node and mpm
brew update
brew install node

# Query version
node -v
npm -v

# Install nodemon -> needed to check for chnages to obsidian vault.
npm install -g nodemon
nodemon -v
````

Clone [quartz](https://github.com/jackyzha0/quartz) locally. The `contents/` folder insider quartz is the data that is going to be publicly displayed. You will want to sync the new quartz directory with GitHub. Follow these [steps](https://quartz.jzhao.xyz/setting-up-your-GitHub-repository).

In the quartz directory add the [compile](https://github.com/brandonkboswell/quartz/blob/hugo/compile.sh) scripts. The compile script first empties the contents in quartz. It then uses obsidian exporter to only export allowlisted files. Add a `.export-ignore` files to the root obsidian vault. This is similar to `.gitignore`. Used for selectively excluding files from being exported. Note that this file cannot be created in obsidian as it starts with a `.`. You will have to create/edit it on an IDE.

Build and preview the website before pushing to GitHub. Can be done by running - `npx quartz build --serve`. Pushing to GitHub can be done using `npx quartz sync`.

 > 
 > \[!Warning\]
 > Quartz does not natively support dataview and excalidraw. Refer [GitHub Publisher](./GitHub%20Publisher.md).

For more advanced modifications refer [Quartz](Quartz.md).

##### References

* [Quartz Website](https://quartz.jzhao.xyz)
* [Brandon Boswell's video on setting up Quartz](https://youtu.be/ITiiuBNVue0?feature=shared)
* [Nicole's video on setting up Quartz](https://www.youtube.com/watch?v=6s6DT1yN4dw)
