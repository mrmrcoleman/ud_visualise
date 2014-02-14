#!/bin/bash -vxe

cd pythonjs
sudo docker build -rm -t mrmrcoleman/pythonjs .
sudo docker push mrmrcoleman/pythonjs
cd ../visualise
sudo docker build -rm -t mrmrcoleman/visualise .
