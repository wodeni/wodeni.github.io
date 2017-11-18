#! /bin/sh

bundle exec jekyll build --config "_config-columbia.yml"
git pub
ssh cunix "cd ~; sh publish.sh"
