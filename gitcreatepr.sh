# https://github.com/github/hub
# Must be ssh cloned
cd /var/www/materialos.com/public_html/uploads/icons/

author=$1
note=$2
nospaceauthor=${author//[[:blank:]]/}

if [ -d "$author" ]; then
;
else
mkdir "$author"
fi

cd "./$author/"

if [ -f *.ai ]; then
mv *.ai ./Vector
mkdir Vector
fi

if [ -f *.svg ]; then
mv *.svg ./Vector
mkdir Vector
fi

if [ -f *.sketch ]; then
mv *.sketch ./Vector
mkdir Vector
fi

if [ -f *.xcf ]; then
mv *.xcf ./"Raster Editor"
mkdir "Raster Editor"
fi

if [ -f *.psd ]; then
mv *.psd ./"Raster Editor"
mkdir "Raster Editor"
fi

if [ -f *.png ]; then
mv *.png ./Raster
mkdir Raster
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