### CentOS 安装最新docker
安装最新版本的Docker在CentOS上可以通过Docker官方仓库进行操作。以下是操作步骤：

1. 如果已经安装了旧版本的Docker，先将其移除：

```bash
sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
```

2. 安装必要的依赖：

```bash
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

3. 添加Docker仓库：

```bash
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

4. 安装Docker：

```bash
sudo yum install -y docker-ce
```

5. 启动并设置Docker开机自启：

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

6. 验证Docker是否正确安装，运行以下命令：

```bash
sudo docker --version
```

如果安装成功，将显示已安装的Docker版本信息。

### 其它命令
```bash
docker stop container-name;  # container-name容器名称
docker rm container-name
```
### docker常用命令
```bash
#查看docker版本
docker version	
# 查看docker概要信息	   
docker info			
# 查看docker帮助文档     
docker --help		     
# 在Docker Hub上查找镜像
docker search 镜像名称                   
# 拉取镜像
docker pull 镜像名称    	
# 查看镜像  -a 列出本地所有镜像  -q 只显示镜像ID		           
docker images/docker image ls          
# 删除单个镜像 如果该镜像正在使用（创建了容器），那么就先删除容器再删除镜像
docker rmi -f 镜像ID   
# 删除全部镜像                 
docker rmi -f					                 
# 查看运行中的容器
docker ps 	
# 查看所有容器			
docker ps -a			
# 查看最后一次运行的容器
docker ps -l			
# 创建容器
docker run  -name	为容器指定一个新名称 -d	在后台运行
# 启动指定容器
docker start 容器名称/容器ID		
# 关闭指定容器
docker stop 容器名称/容器ID		
# 重启容器
docker restart 容器名称/容器ID		
# 删除指定容器
docker rm 容器名称/容器ID		
# 进入正在运行的容器
docker exec -it 容器ID的前几个内容 /bin/bash    
# 退出容器   
exit          
# 查看容器的IP
docker inspect 容器id的前几个内容   				 
```
