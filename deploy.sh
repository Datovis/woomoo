#!/bin/bash

tarball=tmp.tar.bz2
current=$WOOMOO_PATH`date +"%Y%m%d%H%M%S"`

echo 'Clean cache...'
hexo clean
echo '...done!'
echo ''

echo 'Building static files...'
hexo gm --cssSafe
echo '...done!'
echo ''

echo 'Compressing local files...'
rm -rf tmp tmp.tar.bz2
mv public tmp
tar cvfj $tarball tmp
echo '...done!'
echo ''

echo 'Copy file to server...'
scp -P $WOOMOO_PORT $tarball $WOOMOO_USER@$WOOMOO_HOST:$WOOMOO_TMP.tar.bz2
echo '...done!'
echo ''

echo 'Decompress server file...'
ssh -p $WOOMOO_PORT $WOOMOO_USER@$WOOMOO_HOST "tar -xvf $WOOMOO_TMP.tar.bz2"
echo '...done!'
echo ''

echo 'Move tmp files to www-data WOOMOO_USER & change owner...'
ssh -p $WOOMOO_PORT -t $WOOMOO_USER@$WOOMOO_HOST "echo $WOOMOO_PASS | sudo -S mv $WOOMOO_TMP $current"
ssh -p $WOOMOO_PORT -t $WOOMOO_USER@$WOOMOO_HOST "echo $WOOMOO_PASS | sudo -S chown -R www-data:www-data $current"
echo '...done!'
echo ''

echo 'Switching the server to the latest version...'
ssh -p $WOOMOO_PORT -t $WOOMOO_USER@$WOOMOO_HOST "echo $WOOMOO_PASS | sudo -S rm -rf $WOOMOO_PATH"
ssh -p $WOOMOO_PORT -t $WOOMOO_USER@$WOOMOO_HOST "echo $WOOMOO_PASS | sudo -S cp -R $current $WOOMOO_PATH"
ssh -p $WOOMOO_PORT -t $WOOMOO_USER@$WOOMOO_HOST "echo $WOOMOO_PASS | sudo -S chown -R www-data:www-data $WOOMOO_PATH"
echo '...done!'
