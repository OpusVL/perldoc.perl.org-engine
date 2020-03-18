#!/bin/bash

shopt -s expand_aliases

export GIT_DISCOVERY_ACROSS_FILESYSTEM=1

echo "Entering work loop"
while true
do
    echo "Changing to /root"
    cd /root
    echo "Configuring GIT"
    git config --global user.email "support@opusvl.com"
    git config --global user.name "Auto Commit Bot"
    echo "Cleaning build base"
    rm -Rf en* perldoc* output*
    echo "Cloning engine"
    git clone git@github.com:OpusVL/perldoc.perl.org-engine.git engine
    cd engine && git co develop
    echo "Copying engine into work base"
    mkdir -p perldoc.perl.org
    cp -Rp engine/* perldoc.perl.org/
    echo "Removing unused directories"
    rm -Rf engine
    echo "Swapping into work base"
    cd perldoc.perl.org
    echo "Creating work directory"
    mkdir -p work
    echo "Changing into workbase"
    cd work
    echo "Removing output"
    rm -Rf output
    echo "Fetching latest output"
    git clone git@github.com:OpusVL/perldoc.perl.org-export.git output
    echo "Swapping to /root/perldoc/perl.org"
    cd /root/perldoc.perl.org
    echo "Starting sitegen"
    perl sitegen.pl
    echo "Swapping to output directory"
    cd work/output
    echo "Finding the latest perl"
    latest_perl=$(perl -MJSON -MData::Dumper -e 'local $/;open($fh,"<","versions.json");$j=decode_json(<$fh>);print join(".",5,$j->{latest}->{major},$j->{latest}->{minor})')
    echo "Linking to $latest_perl as default"
    ln -sf $latest_perl .default
    echo "git commit"
    git commit -am "AutoCommit"
    #git push -f origin master
    echo "Sleeping for 24 hours before retrying";
    perl -e 'print "Sleeping 24 hours\n"; sleep(60*60*24)'
done
