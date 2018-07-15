#! /bin/sh

JEKYLL_ENV=production bundle exec jekyll build --config "_config-columbia.yml"
git add -A
git ci -m "uploading to Columbia server"
git push
ssh cunix "cd ~; sh publish.sh"
