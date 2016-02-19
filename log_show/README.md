## deploy

```sh

# change the socket io url
docker build -t log_show .

```

## run

```sh

docker run  -d -p 3001:3001 --name pp_log_show \
--log-driver=syslog log_show

```
