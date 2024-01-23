# Personal site

This is the repo for my [personal site](https://www.cs.cmu.edu/~woden/). 
## Getting started

* Run `yarn` to install dependencies.
* Run `yarn dev` to start the development server locally.
* Run `yarn build` to produce a production build.

## What the site does

* BibTeX parsing: use [bibtex-js](https://github.com/digitalheir/bibtex-js) to load a `.bib` file of your publications to display them automatically.
* Fun hero widget using [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction).
  * For now, I'm using a version of [this demo](https://codesandbox.io/s/ssbdsw) with some collision detection added.
* Markdown blog post parsing via [`vite-plugin-markdown`](https://www.npmjs.com/package/vite-plugin-markdown) and automatic route generation.
* Mobile-first responsive styling and dark mode support via [Tailwind CSS](https://tailwindcss.com/).
* JSX and some React for content.

## Future

* [ ] Pool page
* [ ] Make the widget more interesting
* [ ] Create a light-weight template from this site for others?