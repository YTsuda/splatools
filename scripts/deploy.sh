#! /bin/sh
cd `dirname $0`
cd ../
grunt build
git add -A
git commit
git push origin
git subtree push --prefix dist origin gh-pages
