#!/bin/sh -vxe

cd visualise
sudo docker build -rm -t mrmrcoleman/visualise .
RUN_ID=$(sudo docker run -p 5000:5000 -d mrmrcoleman/visualise /bin/bash -c "cd /opt/visualise/ && python run.py")
sleep 5
cd visualise
python test.py
sudo docker stop $RUN_ID

if ["$1" = "-p"]
then
  sudo docker push mrmrcoleman/visualise
fi
