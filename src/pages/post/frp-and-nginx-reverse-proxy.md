---
title: frp 搭建与 nginx 反向代理
date: 2022-08-25 10:55:00
tags:
  - nginx
  - frp
  - linux
---

前段时间武汉长时间的干旱，电力不足，公司所在园区限电，不开空调（电脑可开），所以只能远程办公。远程桌面客户端有很多，如 RemoteDesktop、向日葵、anyDesk 等。由于公司用的是内网，所以还需要一个内网穿透工具，之前在论坛看到过很多次所以我选择了 frp，还有 zerotier 等其他工具，还没研究过。

## frp 服务器端

首先需要一个有公网 ip 的服务器，最开始我是在 digitalocean 上的 vps 上搭建的，但是由于是国外的服务器，搭建好后发现速度捉急。后来我换了个阿里云的 ECS，由于是临时使用，我就选了个最低配的 30 天试用版。
首先在 github release 页面找到 linux 平台的安装版本，登录到云服务器，下载并解压：

```bash
curl -sLo/tmp/frp.tar.gz  https://github.com/fatedier/frp/releases/download/v0.44.0/frp_0.44.0_linux_amd64.tar.gz

tar -xvf /tmp/frp.tar.gz

sudo mv /tmp/frp_0.44.0_linux_amd64 ~/frp
```

修改 `frps.ini` frp 服务端配置文件，所有配置及其相应解释可以在 `frps_full.ini` 中找到。

```ini
# [common] is integral section
[common]
# A literal address or host name for IPv6 must be enclosed
# in square brackets, as in "[::1]:80", "[ipv6-host]:http" or "[ipv6-host%zone]:80"
bind_addr = 0.0.0.0
bind_port = 5443
# udp port used for kcp protocol, it can be same with 'bind_port'
# if not set, kcp is disabled in frps
kcp_bind_port = 5443
# if you want to configure or reload frps by dashboard, dashboard_port must be set
dashboard_port = 6443
# dashboard assets directory(only for debug mode)
dashboard_user = admin
dashboard_pwd = strong_password
# assets_dir = ./static
vhost_http_port = 5000
vhost_https_port = 5001
# console or real logFile path like ./frps.log
log_file = ./frps.log
# debug, info, warn, error
log_level = info
log_max_days = 3
# auth token
token = secret_token
# only allow frpc to bind ports you list, if you set nothing, there won't be any limit
#allow_ports = 1-65535
# pool_count in each proxy will change to max_pool_count if they exceed the maximum value
max_pool_count = 50
# if tcp stream multiplexing is used, default is true
tcp_mux = true
```

其中 vhost_http_port 和 vhost_https_port 默认为 80 和 443，如果你的服务器有作博客之类的则可能已经被占用，所以这里做了修改。配置好之后开启服务：`./frps -c frps.ini` 即可。

### 使用 systemd 设置服务端开机自启

[来源](https://github.com/fatedier/frp/issues/176#issuecomment-266959497)

创建 `fprs.servcie` 文件在 frp 目录，这里我把 frp 解压后的文件放在 `/root/frp`。

```plaintext
[Unit]
Description=frps daemon
After=syslog.target network.target
Wants=network.target

[Service]
Type=simple
Restart=always
RestartSec=1min
User=root
ExecStart=/root/frp/frps -c /root/frp/frps.ini
ExecStop=/usr/bin/killall frpc

[Install]
WantedBy=multi-user.target
```

然后在 `/etc/systemd/system/` 创建一个 symlink，启动 & enable 服务即可

```bash
ln -s /root/frp/frps.service /etc/systemd/system/frps.service

systemctl start frps.service

systemctl enable frps.service
```

## frp 客户端

一个服务端可以链接许多个客户端，上面的配置中 max_pool_count 配置了 50。客户端支持各种类型（功能）的连接，ssh tcp http 等，下面说一下我用到的 3 种。

### wsl2 开启 ssh 连接

```ini
; frpc.ini
[common]
server_addr = x.x.x.x # 服务端的 ip，如果有配置域名也可以使用域名
server_port = 5443 # 服务端端口
token = secret_token # 服务端配置的 token

[ssh-wsl-work]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6001
```

`./frpc -c frpc.ini` 开启 frp 客户端连接。

首先被 ssh 的 wsl 需要开启 sshd 服务，由于 wsl2 被砍掉了 system init 服务，无法设置开机自启，所以需要手动启动服务 `sudo service sshd start`。不过在启动之前，需要先编辑一下 `/etc/ssh/sshd_config` 配置文件，在末尾加入（或者 uncomment）下面两个配置，注意 `AllowUsers` 后面是个 _tab_。

```plaintext
PasswordAuthentication yes
AllowUsers    username
```

在另一台电脑 `ssh -oPort username@x.x.x.x`，即可连接上 wsl，

### windows 远程桌面

```ini
; frpc.ini
[common]
server_addr = x.x.x.x # 服务端的 ip，如果有配置域名也可以使用域名
server_port = 5443 # 服务端端口
token = secret_token # 服务端配置的 token

[remote_desktop_work]
type = tcp
local_ip = 127.0.0.1
# 远程桌面端口，这个不能改
local_port = 3389
remote_port = 7005
```

打开 **cmd** 切换到 frp 程序目录，输入 `./frpc -c frpc.ini` 开启 frp 客户端连接。如果有需要，可以通过设置 windows 开机脚本来让 frpc 开机自启，可以参看 [这里](https://lo-li.cn/239)

在另一台电脑打开 RDP 连接 `server_addr:7005`，输入远程电脑允许的用户凭据即可。

### http 服务映射（反向代理）

```ini
; frpc.ini
; common 省略

[web01]
type = http
local_ip = 172.22.54.78 # 本地ip
local_port = 3000 # 本地服务端口
costom_domains = web01.custom.domain # 这个服务自定义的域名，在域名托管者处 添加 A record 指向云服务器地址即可
```

客户端服务开启后，访问 `http://web01.custom.domain:5000` 即可，这个是前面服务端配置中的 `vhost_http_port` 字段定义的。

## 结合 nginx 反向代理使用

有了 frp 做内网穿透，就可以结合 nginx 的反向代理来实现在家里开启本地前端服务，连接上公司内网中的后端接口服务了。

在公司内网的电脑 frpc 客户端加上需要被穿透的端口:

```ini
; frpc.ini

[wsl-frontend-project]
type = http
local_ip = 172.22.1.93 # 本地 ip
local_port = 8000 # 反向代理监听的 端口
custom_domains = project-api.cusotm.doamin # 再加一个 A record
```

然后再公司服务器开启一个 nginx 服务，主要配置如下：

```plaintext
server {
    listen 8000; # 穿透的端口
    location / {
      root /usr/share/nginx/html;
      index index.html index.htm index.php;
      client_max_body_size 10M;
      proxy_pass http://10.12.137.13:2014;
      proxy_redirect default;
      client_max_body_size 1000m;
      proxy_set_header Host $http_host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 更具体的配置，示例
    location /auth {
      root html;
      index index.html index.htm index.php;
      proxy_pass http://10.12.137.13:2014/cloud/api/auth; # 后端服务的地址
      proxy_redirect default;
      client_max_body_size 1000m;
      proxy_set_header Host $http_host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }
  }
```

在家中的电脑开启前端服务，修改 api 服务为 `http://project-api.custom.domain:5000`，这里的 5000 还是为上文服务端配置的端口。

## 可能遇到的问题

1. 如果云服务器开启了防火墙，比如 ufw (Ubuntu)，需要 `sudo ufw enable port` 来开启相应的端口
2. 以上的 wsl 都是 Ubuntu
3. Windows 上无法访问 nginx 反向代理暴露的端口的服务，可能是被 windows 防火墙规则阻止，打开 _高级安全 Windows Defender 防火墙_ 允许 nginx.exe 的入站与出站流量

## 参考

1. 视频教程 <https://www.youtube.com/watch?v=UeuPNkDK84o>
2. frp github 项目地址 <https://github.com/fatedier/frp>
3. websocket 的 nginx 反向代理 <https://www.xncoding.com/2018/03/12/fullstack/nginx-websocket.html>
