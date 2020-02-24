#!/bin/bash

shopt -s expand_aliases

# Configure GIT
export GIT_DISCOVERY_ACROSS_FILESYSTEM=1
echo "Configuring GIT"
git config --global user.email "support@opusvl.com"
git config --global user.name "Auto Commit Bot"

# A copy of the modern engine is hosted in /root/dev-src
# A copy of the work/export is hosted in /root/perldoc.perl.org/work

# Copy the new engine in
cp -R /root/dev-src/* /root/perldoc.perl.org/

# Swap to the main source system
cd /root/perldoc.perl.org
echo "Changing into workbase, work/"
cd work

echo "Removing output, output/ (skipped)"
#rm -Rf output
echo "Fetching latest output (skipped)"
#git clone git@github.com:OpusVL/perldoc.perl.org-export.git output

echo "Entering work loop"
while true
do
    cd /root/perldoc.perl.org
    perl sitegen.pl
    cd work/output
    echo "Trying to read versions.json (entrypoint)"
    latest_perl=$(perl -MJSON -MData::Dumper -e 'local $/;open($fh,"<","versions.json");$j=decode_json(<$fh>);print join(".",5,$j->{latest}->{major},$j->{latest}->{minor})')
    ln -sf $latest_perl .default
#    git add .
#    git commit -am "AutoCommit"
#    git push -f origin master
    echo "Sleeping for 24 hours before retrying";
    perl -e 'print "Sleeping 60 seconds\n"; sleep(60)'
done
