FROM quay.io/opusvl/opusvl-perl-base:release-3 AS osbase
LABEL maintainer OpusVL <support@opusvl.com>

# Become god
USER root
WORKDIR /root

# Add in ssh configuration for use with pushing git repos
COPY ssh /root/.ssh

# Add in essentials for this project
RUN apt-get update \
    && apt-get install -y build-essential bison byacc unzip git

# Fix permissions and configure git
RUN cd /root \
    && chown -R root .ssh \
    && chmod -R 700 .ssh \
    && echo "Host github.com" >> .ssh/config \
    && echo "\tStrictHostKeyChecking no" >> .ssh/config 

# Add in a few missing deps
RUN cd /opt/perl5/bin && ./cpanm Getopt::Long \
    Data::Dumper \
    LWP::UserAgent \
    HTML::TreeBuilder \
    File::Path \
    Crypt::Digest::SHA256 \
    Archive::Tar \
    Capture::Tiny \
    Try::Tiny \
    File::Find \
    Template \
    JSON::MaybeXS \
    Devel::PatchPerl@1.56 \
    Perl::Tidy@20101217 

COPY dumb-init_* /dumbinit
COPY entrypoint.sh /
RUN chmod +x /dumbinit 
RUN chmod +x /entrypoint.sh

# Kickstart the script into action
ENTRYPOINT [ "/dumbinit", "--", "/entrypoint.sh" ]
