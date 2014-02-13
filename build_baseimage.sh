#!/bin/sh -vxe

cd pythonjs
sudo docker build -rm -t mrmrcoleman/pythonjs .
sudo docker push mrmrcoleman/pythonjs
