FROM sequenceiq/spark:1.6.0

# add flume jars
RUN yum install -y wget
RUN mkdir /flume_jars; cd /flume_jars; wget http://central.maven.org/maven2/org/apache/spark/spark-streaming-flume-assembly_2.10/1.6.0/spark-streaming-flume-assembly_2.10-1.6.0.jar

# add my test streaming file
ADD streaming /streaming
