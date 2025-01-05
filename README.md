# Personal site

This is the repo for my [personal site](https://www.cs.cmu.edu/~woden/). 
## Getting started

* Run `yarn` to install dependencies.
* Run `yarn dev` to start the development server locally.
* Run `yarn build` to produce a production build.

## What the site does

* BibTeX parsing: use [bibtex-js](https://github.com/digitalheir/bibtex-js) to load a `.bib` file of your publications to display them automatically.
* Fun hero widget using [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction).
  * For the home page, I'm using a version of [this demo](https://codesandbox.io/s/ssbdsw) with some collision detection added.
  * For the pool page, it's a simple animation with some basic controls.
* Styling and basic responsiveness via [Tailwind](https://tailwindcss.com/).
* JSX and some minimal React for content.
* Markdown rendering for static posts in the [pool page](https://wodenimoni.com/pool/) via a [custom Vite plugin](https://github.com/wodeni/wodeni.github.io/blob/main/plugins/vite-remark.mts). The plugin works with Obsidian notes and does things like `[[wikilink]]` transforms and image asset handling.

## Future

* [x] Pool page
* [x] Make the widget more interesting
* [ ] Create a light-weight template from this site so others can create similar sites, like [this one](https://zixinwen.com/).
 
