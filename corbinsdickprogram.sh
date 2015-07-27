# https://github.com/github/hub
# Must be ssh cloned

author=$1
note=$2

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
	