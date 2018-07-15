#! /bin/sh

JEKYLL_ENV=production bundle exec jekyll build --config "_config-cmu.yml"
rsync -v -r -e ssh ~/dev/nimo-site/_site/ cmu:~/www
