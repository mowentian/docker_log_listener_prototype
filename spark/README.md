
## deploy

```sh
docker build -t pp-spark .
```

please refer: [sequenceiq/docker-spark](https://github.com/sequenceiq/docker-spark)

## run

```sh
docker run -it -p 9999:9999 -h sandbox pp-spark bash
```

## flume

```sh

spark-submit \
--jars /flume_jars/spark-streaming-flume-assembly_2.10-1.6.0.jar \
/streaming/flume_wordcount.py \
0.0.0.0 9999

```
