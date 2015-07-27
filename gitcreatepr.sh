#!/bin/bash
# https://github.com/github/hub
# Must be ssh cloned
cd /var/www/materialos.com/public_html/uploads/icons/

author=$1
note=$2
nospaceauthor=${author//[[:blank:]]/}

if [ -d "$author" ]; then
:
else
mkdir "$author"
fi

cd "./$author/"

if [ -f *.ai ]; then
mkdir Vector
mv *.ai ./Vector
fi

if [ -f *.svg ]; then
mkdir Vector
mv *.svg ./Vector
fi

if [ -f *.sketch ]; then
mkdir Vector
mv *.sketch ./Vector
fi

if [ -f *.xcf ]; then
mkdir "Raster Editor"
mv *.xcf ./"Raster Editor"
fi

if [ -f *.psd ]; then
mkdir "Raster Editor"
mv *.psd ./"Raster Editor"
fi

if [ -f *.png ]; then
mkdir Raster
mv *.png ./Raster
fi

cd ..

tyme=`date +%Y%m%d%H%M%S`
git checkout -b $nospaceauthor$tyme
git add *
git commit -m "Added some icons by $author! Thanks $author!"
git push --set-upstream origin $nospaceauthor$tyme
hub pull-request -m "Added some icons by $author! Thanks $author!

$note" -b materialos:master -h autocontribute:$nospaceauthor$tyme

git checkout master
git fetch --all
git reset --hard origin/master
git pull
git remote add upstream https://github.com/materialos/Icons/
git fetch upstream
git checkout master
git merge upstream/master
git push