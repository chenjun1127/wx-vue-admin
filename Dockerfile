# 使用官方 Nginx 镜像作为基础镜像
FROM nginx:latest

# 删除 Nginx 默认配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 将自定义的 Nginx 配置文件复制到容器中
COPY nginx.conf /etc/nginx/conf.d/

# 将打包生成的静态文件复制到 Nginx 的默认工作目录
COPY dist/ /usr/share/nginx/html

# 开放容器对外的80端口
EXPOSE 80
