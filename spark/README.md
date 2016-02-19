
## deploy

```sh
docker build -t pp-spark .
```

please refer: [sequenceiq/docker-spark](https://github.com/sequenceiq/docker-spark)

## run

```sh
docker run -it -p 9999:9999 -h sandbox pp-spark bash
docker run -d -p 9999:9999 --log-driver=syslog -h sandbox pp-spark
```

## flume

```sh

spark-submit \
--jars /flume_jars/spark-streaming-flume-assembly_2.10-1.6.0.jar \
/streaming/flume_wordcount.py \
0.0.0.0 9999 http://172.17.0.1:3001

```
