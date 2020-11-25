
在当前目录运行：

1. 创建镜像 : 

docker build -t felixyin/sysm-redis ./

需要将felixyin/sysm-redis 替换为你的镜像名称

2. 启动

docker run --name sysm-redis -p 32776:6379 -v /Users/fy/workspace/webstorm/sysm/docker/redis/data:/data -d felixyin/sysm-redis

需要将/Users/fy/workspace/webstorm/sysm/docker/redis/data替换为data目录在你磁盘的绝对路径
需要将felixyin/sysm-redis替换为你的颈项名称

