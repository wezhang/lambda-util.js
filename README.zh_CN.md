# 览云精微工具箱
此工具箱使用 Node.js 开发而成，提供了在命令行下的可执行脚本。

## 安装
1. 请参考 https://nodejs.org/download/, 根据相应的运行平台安装版本号大于0.10的 Nodejs 运行环境。安装后，请确认已安装正常：
   - Mac OS/Linux 下请通过命令行 `which node npm` 命令来检查或者直接运行 `node` 和 `npm` 命令来确认运行环境已经正常安装
   - Windows 下请通过命令行 `where node npm` 命令来检查
2. 准备好 `git` 工具
3. 使用 `git`, 将代码克隆到本地
       git clone https://github.com/lambdacloud/lambda-util.js.git
4. 进入 `lambda-util.js` 目录，运行 `npm install` 安装工具的依赖包
       $ cd lambda-util.js
       $ npm install
5. 依赖包安装完毕后，就可以使用了，所有可执行脚本都位于 `bin` 目录下

# 工具列表

## Elastic 相关工具

Elastic (之前品牌为 ElasticSearch) 是一个基于 Lucene 构建的开源分布式搜索引擎。本工具箱用于帮助 Elastic 服务的维护工作。

### elastic2json

将 Elastic 的数据以 JSON 格式导出。JSON 格式的数据会被输出到控制台标准输出。如果需要以磁盘文件格式存储，可以使用 shell 的重定向功能完成。

#### 命令
    bin/elastic2json -H <ElasticHost:[port]> -i <ElasticIndex>

#### 参数列表

```
$ bin/elastic2json --help

  Usage: elastic2json [options]

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -H, --host <Elastic Host>        Specify Elasticsearch host and port, default: localhost:9200
    -D, --debug                      Enable Debugging
    -i, --indices <Elastic indices>  Specify indices
    --api <version>                  Specify Elasticsearch API version, such as, 1.1, 1.2, 1.3, default: 1.4.
```

#### 示例
1. 将本地 Elastic 服务（服务端口为9200）的 fooindex 索引的数据以 JSON 格式导出，输出到控制台标准输出
 ```
  $ bin/elastic2json --host localhost:9200 --indices fooindex
```

2. 将 IP 地址为 10.9.0.1，端口为9200的 Elastic 服务的 logstash-2015.03.03 索引数据以 JSON 格式导出到磁盘文件 log.json
 ```
  $ bin/elastic2json --host 10.9.0.1:9200 --indices logstash-2015.03.03 > log.json
```

## LambdaCloud 相关工具

此类工具是和览云共有云服务相关工具，提供日志的上载等相关服务。

#### 命令
    bin/line2lambdacloud --token <user_token>

#### 参数列表

```
$ bin/line2lambdacloud --help

  Usage:  [options]

  Usage: line2lambdacloud [options]

  Options:

    -h, --help                          output usage information
    -V, --version                       output the version number
    -D, --debug                         Enable Debugging
    -P, --proxy <http proxy>            Set proxy
    -B, --batch <batch size>            Set http uploading request batch size, by default: 64
    -T, --token <token of lambdacloud>  Specify the token
```

#### 示例
1. 发送一条日志到Lambdacloud的日志服务
 ```
  $ echo 'Hello LambdaCloud log service!' | bin/line2lambdacloud --token 4eb15944-2475-4238-af07-608957fc72fa
```

2. 将一个日志文件发送到Lambdacloud的日志服务
 ```
  $ cat /var/log/syslog | bin/line2lambdacloud --token 4eb15944-2475-4238-af07-608957fc72fa
```

3. 将一个日志文件的最新增加的日志发送到Lambdacloud的日志服务
 ```
  $ tail -F /var/log/syslog | bin/line2lambdacloud --token 4eb15944-2475-4238-af07-608957fc72fa
```
