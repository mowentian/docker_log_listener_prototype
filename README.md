
![](prototype_arch_design.dot.png)

1. 使用 docker 的 `--log-driver=syslog`，将日志采集到 syslog 中；
1. 使用 flume 对 syslog 作为 `source`
1. 将 syslog sink 到两个地方：
  1. `hdfs`：采用 spark 用作块分析
  1. `spark stream`：进行实时流分析

`flume` 这层可以用 `Kafka` 代替。
