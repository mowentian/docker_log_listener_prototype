#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

"""
 Counts words in UTF8 encoded, '\n' delimited text received from the network every second.
 Usage: flume_wordcount.py <hostname> <port>
 To run this on your local machine, you need to setup Flume first, see
 https://flume.apache.org/documentation.html
 and then run the example
    `$ bin/spark-submit --jars \
      external/flume-assembly/target/scala-*/spark-streaming-flume-assembly-*.jar \
      examples/src/main/python/streaming/flume_wordcount.py \
      localhost 12345
"""
from __future__ import print_function

import sys

from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from pyspark.streaming.flume import FlumeUtils

import json
import urllib2

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: flume_wordcount.py <hostname> <port> <logshowurl>",
            file=sys.stderr)
        exit(-1)

    sc = SparkContext(appName="PythonStreamingFlumeWordCount")
    ssc = StreamingContext(sc, 1)

    hostname, port, logshowurl = sys.argv[1:]
    kvs = FlumeUtils.createStream(ssc, hostname, int(port))
    lines = kvs.map(lambda x: x[1])
    counts = lines.flatMap(lambda line: line.split(" ")) \
        .map(lambda word: (word, 1)) \
        .reduceByKey(lambda a, b: a+b)
    counts.pprint()
    counts.foreachRDD(postRDD)

    ssc.start()
    ssc.awaitTermination()

def postRDD(rdd):
    rdd.foreach(lambda record: postRecode(record))

def postRecode(record):
    data = json.dumps(record)
    head = {'Content-Type': 'application/json'}
    req = urllib2.Request(logshowurl, data, head)
    f = urllib2.urlopen(req)
    res = f.read()
    f.close()
