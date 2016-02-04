
## deploy

```sh
docker build -t pp-spark .
```

please refer: [sequenceiq/docker-spark](https://github.com/sequenceiq/docker-spark)

## run

```sh
docker run -it -p 8088:8088 -p 8042:8042 -h sandbox pp-spark bash
```

## test

```sh
yum install nc
nc -lk 9999
spark-submit /streaming/network_wordcount.py localhost 9999
```
please refer: [spark streaming-programming-guide](http://spark.apache.org/docs/latest/streaming-programming-guide.html)
