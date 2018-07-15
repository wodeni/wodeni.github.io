#! /bin/sh

JEKYLL_ENV=production bundle exec jekyll build --config "_config-cmu.yml"
git add -A
git ci -m "uploading to CMU server"
git push
ssh cunix "cd ~; sh publish.sh"
