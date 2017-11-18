#! /bin/sh

bundle exec jekyll build --config "_config-columbia.yml"
git add -A
git ci -m "uploading to Columbia server"
ssh cunix "cd ~; sh publish.sh"
