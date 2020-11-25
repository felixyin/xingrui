# sysm
兴瑞实验室管理系统

运行环境：docker 17.03.1



## 全自动运行方法：
 - 创建容器和启动：docker-compose up -d
 - 打开浏览器访问：http://localhost:8081
 - 停止请用：docker-compose down


## 手动运行方法：
1. 安装mysql、redis依赖：
  - 安装mysql和初始化数据库，参照docker/mysql/readme.md
  - 安装redis，参照docker/redis/readme.md
  
2. 运行项目：
  - cd [root目录]
  - 编译镜像：docker build -t felixyin/sysm ./  或者是：docker pull felixyin/sysm
  - 运行：docker run  -d --name sysm-web -p 8081:8080 --link sysm-mysql:db --link sysm-redis:redis felixyin/sysm
  

## 数据目录：

1. mysql数据目录：
  系统启动后，会自动"挂载" **docker/mysql/data** 目录作为mysql的数据存放位置
2. redis数据目录：
  系统启动后，会自动"挂载" **docker/redis/data** 目录作为mysql的数据存放位置


## 代码提交和持续集成
1. 支持git，代码提交到github
2. 代码更新：docker exec -it felixyin/sysm-web bash update
2. 重新启动：docker-compose restart