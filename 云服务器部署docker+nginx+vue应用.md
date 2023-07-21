### 云服务器部署docker+nginx+vue应用

#### 方式一：基于创建的镜像启动容器启动
1、在本地构建Vue应用并打包：
```bash
npm run build
```
2、将dist目录上传到云服务器：
使用工具如SCP或SFTP将本地的dist目录上传到云服务器的任意目录，例如：/home/app/dist。

3、创建Dockerfile：

在您的Vue应用目录下创建一个名为Dockerfile的文件，用于构建Nginx镜像。Dockerfile内容如下：
```bash
# 使用官方 Nginx 镜像作为基础镜像
FROM nginx:latest

# 删除 Nginx 默认配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 将自定义的 Nginx 配置文件复制到容器中
COPY nginx.conf /etc/nginx/conf.d/

# 开放容器对外的80端口
EXPOSE 80
```
4、创建Nginx配置文件：

在Vue应用目录下创建一个名为nginx.conf的文件，用于配置Nginx服务器
```bash
server {
  listen 80;
  server_name your_domain.com;  # 将your_domain.com替换为您的域名或IP地址

  location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri $uri/ /index.html;
  }
}
```
注：确保将nginx.conf和构建的Vue.js应用程序（通常在dist文件夹中）与Dockerfile放在同一个目录中。
5、构建Docker镜像：

打开终端，导航到包含Dockerfile和nginx.conf的Vue应用目录，并执行以下命令构建Docker镜像：
```bash
docker build -t my_nginx_image . # 其中，my_nginx_image是您为镜像起的名称。
```
6、运行Nginx容器：

使用以下命令运行Nginx容器，并将云服务器上的dist目录映射到容器内的Nginx工作目录：
```bash
docker run -d -p 80:80 -v /data/app/dist:/usr/share/nginx/html --name my_nginx_container my_nginx_image
```

#### 方式二：Docker Compose方式
1、编写docker-compose.yml
```yaml
version: '3'

services:
  frontend:
    container_name: 'web-vue'
    image: nginx:latest
    ports:
      - "80:80"           # 将主机的端口80映射到容器的端口80
    restart: always
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf   # 将本地的nginx.conf文件挂载到Nginx容器的配置目录
      - /data/app/dist/:/usr/share/nginx/html/
    environment:
      - TZ=Asia/Shanghai
```
2、运行docker-compose.yml文件
```bash
docker-compose up -d
```
其它命令:
```
docker-compose ps                   #查看运行状态
docker-compose stop                 #停止运行
docker-compose restart              #重启
docker-compose restart service-name #重启单个服务
docker-compose exec service-name sh #进入容器命令行
docker-compose logs [service-name]  #查看容器运行log
```
如果有了Dockerfile，那么docker-compose.yml也可以这样配置
```
version: '3'

services:
  frontend:
    build: ./
    container_name: 'web-vue'
    ports:
      - "80:80"           # 将主机的端口80映射到容器的端口80
    restart: always
    environment:
      - TZ=Asia/Shanghai
```
