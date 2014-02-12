FROM stackbrew/ubuntu:raring

MAINTAINER mrmrcoleman/docker-jenkins

RUN apt-get update

RUN apt-get update && apt-get clean
RUN apt-get install -q -y openjdk-7-jre-headless && apt-get clean
RUN apt-get install -q -y git && apt-get clean
#ADD http://mirrors.jenkins-ci.org/war/1.549/jenkins.war /opt/jenkins.war
ADD jenkins.war /opt/jenkins.war
RUN chmod 644 /opt/jenkins.war
RUN useradd -m jenkins
ADD run /usr/local/bin/run


EXPOSE 8080
VOLUME ["/home/jenkins/.jenkins"]
CMD /usr/local/bin/run
