# 设置基础镜像,如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM qtrj.i234.me:8084/node:10.19.0

MAINTAINER felixyin<ybkk1027@gmail.com>

# 安装npm模块
RUN npm install pm2 bower -g --registry=https://registry.npm.taobao.org;

VOLUME /code

WORKDIR /code
ADD . .

# 安装web静态资源
RUN bower install --allow-root;

# 安装node依赖库
RUN npm install --registry=https://registry.npm.taobao.org;

# 暴露container的端口
EXPOSE 10001

# pm2 启动应用，前台运行，设置日志格式
CMD  pm2 start index -i 2 --no-daemon --merge-logs --log-date-format="YYYY-MM-DD HH:mm Z"
