## deploy

```
docker build -t fake_node_server .
```

## run

```
docker run  -d -p 3000:3000 --name fake_node_running_server --log-driver=syslog  fake_node_server
```

## usage example

```sh
curl 162.243.138.21:3000/1231231
# out put:
1231231
# syslog
Feb  2 00:07:19 packer-debian-8-amd64 docker/dc56b50be2af[14072]: info: GET: 1231231

curl -X PUT -d 'i like it'  162.243.138.21:3000
# output
i like it
# syslog
Feb  2 00:07:12 packer-debian-8-amd64 docker/dc56b50be2af[14072]: warn: PUT: i like it

curl -X POST -d 'i like it'  162.243.138.21:3000
# output
i like it
# syslog
Feb  2 00:07:04 packer-debian-8-amd64 docker/dc56b50be2af[14072]: error: POST: i like it

```
