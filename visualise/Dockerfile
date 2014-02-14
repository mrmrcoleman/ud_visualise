FROM mrmrcoleman/pythonjs

MAINTAINER mrmrcoleman

EXPOSE 5000

ADD visualise/ /opt/visualise/
CMD service apache2 start && tail -F /var/log/apache2/error.log
