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
    && echo "\tStrictHostKeyChecking no" >> .ssh/config \
    && git config --global user.email "autobot@opusvl.com" \
    && git config --global user.name "Auto Commit Bot" \
    && git clone git@github.com:OpusVL/perldoc.perl.org.git 

# Add a native cpanm to the primary base perl install
# Setup for using CPAN
ENV PERL_MM_USE_DEFAULT=1

# Install base libraries
RUN cpan LWP::Protocol::https App::cpanminus


# Add in a few missing deps
RUN cpanm Getopt::Long \
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
    JSON \
    JSON::MaybeXS \
    File::Copy::Recursive \
    Devel::PatchPerl@1.56 \
    Perl::Tidy@20101217

COPY dumb-init_* /dumbinit

RUN chmod +x /dumbinit 

# Kickstart the script into action
ENTRYPOINT [ "/dumbinit", "--", "/root/perldoc.perl.org/docker/entrypoint.sh" ]
