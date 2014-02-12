#!/bin/sh -vxe

sudo docker run -p 5000:5000 -d mrmrcoleman/visualise /bin/bash -c "cd /opt/visualise/ && python run.py"
