# this container use syslog and flume server.

## deploy

```
docker build -t pp-flume .
```

## run

```
docker run \
  -e FLUME_AGENT_NAME=a1 \
  -e FLUME_CONF_FILE=/var/tmp/flume.conf \
  -p 514:514 \
  pp-flume
```
