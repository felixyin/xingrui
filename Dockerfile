# 设置基础镜像,如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM qtrj.i234.me:8084/node:10.19.0

MAINTAINER felixyin<ybkk1027@gmail.com>

WORKDIR /usr/src/node/sysm

# 手动更新代码、编辑、测试脚本
COPY update.sh /usr/local/bin/update

RUN chmod uo+x /usr/local/bin/update

# 基础镜像中已经安装基本工具和运行时
#RUN apt-get update; \
#    apt-get -y upgrade

# node 镜像中已存在
#RUN apt-get -y install git

# 方便查看日志和修改文件
#RUN apt-get -y install vim

# 安装npm模块
RUN npm install pm2 bower -g --registry=https://registry.npm.taobao.org;

# v1: clone github上项目源码
#RUN mkdir -p /usr/src/node; \
#    cd /usr/src/node; \
#    git clone https://github.com/felixyin/sysm.git -b master; \
#    cd sysm;
# end

# v2: 本地项目代码复制到容器中
ADD ./ /usr/src/node/sysm/

WORKDIR /usr/src/node/sysm/

VOLUME /usr/src/node/sysm/
# end

#RUN cd /usr/src/node/sysm/;

# 安装web静态资源
RUN bower install --allow-root;

# 安装node依赖库
RUN npm install --registry=https://registry.npm.taobao.org;

#--registry=https://registry.npm.taobao.org;

# 暴露container的端口
EXPOSE 8080

# pm2 启动应用，前台运行，设置日志格式
CMD  pm2 start index -i 2 --no-daemon --merge-logs --log-date-format="YYYY-MM-DD HH:mm Z"
