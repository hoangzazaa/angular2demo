FROM centos:centos7
MAINTAINER Toshinori Kimura <toshinori@fridaynight.co.jp>

ENV LANG C.UTF-8

# RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -

RUN yum update -y
RUN yum install -y wget gcc-c++ make bzip2 zlib zlib-devel libffi-dev libreadline-gplv2-dev libncursesw5-dev libssl-dev openssl libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev && wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u152-b16/aa0333dd3019491ca4f6ddbe78cdb6d0/jdk-8u152-linux-x64.rpm
RUN rpm -ivh jdk-8u152-linux-x64.rpm && rm jdk-8u152-linux-x64.rpm
# http://download.oracle.com/otn-pub/java/jdk/8u152-b16/aa0333dd3019491ca4f6ddbe78cdb6d0/jdk-8u152-linux-x64.rpm


# Install python
RUN curl -O https://www.python.org/ftp/python/2.7.6/Python-2.7.6.tgz
RUN tar zxf Python-2.7.6.tgz
RUN cd Python-2.7.6 && ./configure --enable-optimizations --prefix=/opt/local && make && make altinstall
RUN rm Python-2.7.6.tgz

# Install fabric
# RUN curl -kL https://bootstrap.pypa.io/get-pip.py | /opt/local/bin/python2.7
# RUN /opt/local/bin/pip2.7 install fabric

# install yarn
RUN wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo

RUN wget http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
RUN rpm -Uvh mysql-community-release-el7-5.noarch.rpm

RUN yum install -y unzip build-essential mysql-community-client.x86_64 nodejs vim yarn
RUN curl -O http://downloads.typesafe.com/typesafe-activator/1.3.10/typesafe-activator-1.3.10.zip
RUN unzip typesafe-activator-1.3.10.zip -d / && rm typesafe-activator-1.3.10.zip && chmod a+x /activator-dist-1.3.10/bin/activator

ENV PATH $PATH:/activator-dist-1.3.10/bin/
ENV SEFURI_SCHEMA_URL jdbc:mysql://db:3306/sefuri_schema?characterEncoding=utf-8



ARG workdir
# RUN mkdir $workdir
WORKDIR $workdir

# CMD ["activator", "run"]