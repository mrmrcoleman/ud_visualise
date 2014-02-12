FROM ubuntu:quantal

MAINTAINER mrmrcoleman/pythonjs

RUN apt-get update

RUN apt-get install -y git
RUN apt-get install -y vim
RUN apt-get install -y python-pip
RUN apt-get install -y python2.7-dev
RUN apt-get install -y postgresql-9.1

ADD requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

