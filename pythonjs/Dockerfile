FROM ubuntu:quantal

MAINTAINER mrmrcoleman/pythonjs

RUN apt-get update

RUN apt-get install -y git
RUN apt-get install -y vim
RUN apt-get install -y python-pip
RUN apt-get install -y python2.7-dev
RUN apt-get install -y apache2
RUN apt-get install libapache2-mod-wsgi
RUN sed -i 's/80/5000/' /etc/apache2/ports.conf

ADD requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

RUN mkdir /var/www/public_html
ADD visualise.wsgi /var/www/visualise/visualise.wsgi
ADD visualise.cfg /etc/apache2/sites-available/visualise
RUN a2ensite visualise

EXPOSE 80
EXPOSE 5000
