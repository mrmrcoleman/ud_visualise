#!/bin/bash -vxe

cd pythonjs
sudo docker build -rm -t mrmrcoleman/python_webapp .
#sudo docker push mrmrcoleman/pythonjs
cd ../visualise
sudo docker build -rm -t mrmrcoleman/visualise .
