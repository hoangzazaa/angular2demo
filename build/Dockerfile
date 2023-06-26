FROM centos:centos7
MAINTAINER Toshiki Asamoto <toshiki@fridaynight.co.jp>

ENV LANG C.UTF-8

# Install Java 8
RUN yum update -y
RUN yum install -y gcc-c++ make bzip2 zlib zlib-devel libffi-dev libreadline-gplv2-dev libncursesw5-dev libssl-dev openssl libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev
ADD jdk-8u162-linux-x64.rpm .
RUN rpm -ivh jdk-8u162-linux-x64.rpm && rm jdk-8u162-linux-x64.rpm

# Install node 8.x
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y unzip build-essential nodejs vim

# Install activator 1.3.10
RUN curl -O http://downloads.typesafe.com/typesafe-activator/1.3.10/typesafe-activator-1.3.10.zip
RUN unzip typesafe-activator-1.3.10.zip -d / && rm typesafe-activator-1.3.10.zip && chmod a+x /activator-dist-1.3.10/bin/activator
ENV PATH $PATH:/activator-dist-1.3.10/bin/

ARG workdir
WORKDIR $workdir

