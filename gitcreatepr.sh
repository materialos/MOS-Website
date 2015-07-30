#!/bin/bash
# https://github.com/github/hub
# Must be ssh cloned

author=$1
note=$2
nospaceauthor=${author//[[:blank:]]/}
repo=$3

cd "/var/www/materialos.com/public_html/uploads/$repo/"



if [ ! -d "$author" ]; then
	mkdir "$author"
fi

cd ./"$author"/

if [ -f *.ai ]; then
	if [ ! -d "Vector" ]; then
		mkdir Vector
	fi
	mv *.ai ./Vector
fi

if [ -f *.svg ]; then
	if [ ! -d "Vector" ]; then
		mkdir Vector
	fi
	mv *.svg ./Vector
fi

if [ -f *.sketch ]; then
	if [ ! -d "Vector" ]; then
		mkdir Vector
	fi
	mv *.sketch ./Vector
fi

if [ -f *.xcf ]; then
	if [ ! -d "Raster Editor" ]; then
		mkdir "Raster Editor"
	fi
	mv *.xcf ./"Raster Editor"
fi

if [ -f *.psd ]; then
	if [ ! -d "Raster Editor" ]; then
		mkdir "Raster Editor"
	fi
	mv *.psd ./"Raster Editor"
fi

if [ -f *.png ]; then
	if [ ! -d "Raster" ]; then
		mkdir Raster
	fi
	mv *.png ./Raster
fi

cd ..

tyme=`date +%Y%m%d%H%M%S`
git checkout -b $nospaceauthor$tyme
git add *
git commit -m "Added some $repo by $author! Thanks $author!"
git push --set-upstream origin $nospaceauthor$tyme
hub pull-request -m "Added some $repo by $author! Thanks $author!

$note" -b materialos:master -h autocontribute:$nospaceauthor$tyme

git checkout master
git fetch --all
git reset --hard origin/master
git pull
git remote add upstream https://github.com/materialos/$repo/
git fetch upstream
git checkout master
git merge upstream/master
git push