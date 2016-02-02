# FROM debian:jessie

# flume
FROM probablyfine/flume
ADD flume.conf /var/tmp/flume.conf

# rsyslog
RUN apt-get update && apt-get -y -q install software-properties-common python-software-properties
RUN apt-get update && apt-get -y -q install rsyslog
EXPOSE 514/tcp 514/udp

ENTRYPOINT ["/usr/sbin/rsyslogd"]
CMD ["-n"]
