FROM sequenceiq/spark:1.6.0

# add flume jars
RUN yum install -y wget
RUN mkdir /flume_jars; cd /flume_jars; wget http://central.maven.org/maven2/org/apache/spark/spark-streaming-flume-assembly_2.10/1.6.0/spark-streaming-flume-assembly_2.10-1.6.0.jar

# add my test streaming file
ADD streaming /streaming

CMD spark-submit \
  --jars /flume_jars/spark-streaming-flume-assembly_2.10-1.6.0.jar \
  /streaming/flume_wordcount.py \
  0.0.0.0 9999 http://172.17.0.1:3001
