#!/bin/bash -vxe

PUSH=$1

RUN_ID=$(sudo docker run -p 5000:5000 -d mrmrcoleman/visualise /bin/bash -c "cd /opt/visualise/ && python run.py")
sleep 5
cd visualise/visualise
python test.py
sudo docker stop $RUN_ID

if [ "$PUSH" == "-p" ]
then
  sudo docker push mrmrcoleman/visualise
fi
