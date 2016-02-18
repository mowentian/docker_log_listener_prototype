## deploy

```
docker build -t log_show .
```

## run

```

docker run  -d -p 3001:3001 --name pp_log_show \
--log-driver=syslog log_show

```
