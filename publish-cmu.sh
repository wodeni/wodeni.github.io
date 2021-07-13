#! /bin/sh

JEKYLL_ENV=production bundle exec jekyll build --config "_config-cmu.yml"
rsync -v -r -e ssh ~/Code/wodeni.github.io/_site/ cmu:~/www
