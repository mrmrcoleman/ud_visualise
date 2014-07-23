FROM mrmrcoleman/python_webapp

MAINTAINER mrmrcoleman

EXPOSE 5000

RUN pip install flask-bootstrap
ADD visualise/ /opt/visualise/
ADD visualise.wsgi /var/www/flaskapp/flaskapp.wsgi
CMD service apache2 start && tail -F /var/log/apache2/error.log
