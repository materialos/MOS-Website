# https://github.com/github/hub
# Must be ssh cloned

author=$1
note=$2

git checkout master
git remote add upstream https://github.com/materialos/Icons/
git fetch upstream
git checkout master
git merge upstream/master
git push

git pull

cd /uploads/icons/$author/
mkdir Vector Raster "Raster Editor"
mv *.ai  *.SVG *.sketch ./Vector
mv *.XCF *.PSD ./"Raster Editor"
mv *.png ./Raster

tyme=`date +%Y%m%d%H%M%S`
git checkout -b $author$tyme 
git add *
git commit -m "Added some icons by $author! Thanks $author!"
git push --set-upstream origin $author$tyme
hub pull-request -m "Added some icons by $author! Thanks $author!

$note" -b materialos:master -h autocontribute:$author$tyme
