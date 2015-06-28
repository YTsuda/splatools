#! /bin/sh
cd `dirname $0`
cd ../
grunt build
git add -A
git commit -m 'build'
git push origin master
git subtree push --prefix dist origin gh-pages
