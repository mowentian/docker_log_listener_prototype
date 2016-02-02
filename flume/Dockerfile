# FROM debian:jessie

# flume
FROM probablyfine/flume
ADD flume.conf /var/tmp/flume.conf

# rsyslog
RUN apt-get update && apt-get -y -q install software-properties-common python-software-properties
RUN add-apt-repository ppa:adiscon/v8-stable
RUN apt-get update && apt-get -y -q install rsyslog
EXPOSE 5140/tcp 5140/udp

ENTRYPOINT ["/usr/sbin/rsyslogd"]
CMD ["-n"]
