
## 设计

![](prototype_arch_design.dot.png)

1. 使用 docker 的 `--log-driver=syslog`，将日志采集到 syslog 中；
1. 使用 flume 对 syslog 作为 `source`
1. 将 syslog sink 到两个地方：
  1. `hdfs`：采用 spark 用作块分析
  1. `spark stream`：进行实时流分析

`flume` 这层可以用 `Kafka` 代替。

## 原型

### 机器配置

`digitalocean`：2 GB Memory / 40 GB Disk / SFO1

> 注意：低于 2G 内存 spark 无法正常运行

### 先后顺序

1. 启动 spark 的 spark flume stream 进程，确定 `host_name` 与 `port`
1. 配置 `flume.conf` 中的  `host_name` 与 `port`
1. 打包启动 flume
1. 启动 fake_node_server

### 输出

在 spark 的终端能够最终到被切分的日志，如下：

```

-------------------------------------------
Time: 2016-02-17 02:43:03
-------------------------------------------
(u'i', 1)
(u'error:', 1)
(u'it', 1)
(u'POST:', 1)
(u'like', 1)
(u'docker/20976c226d84[4052]:', 1)

```
