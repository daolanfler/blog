---
title: 在VPS上搭建博客时遇到的问题
date: 2021-09-19 22:28:53
tags:
  - nginx
  - linux
  - mongodb
  - github
---

这是一篇书签性质的文章

## 购买 VPS 和域名 {#vps-and-dns}

- VPS 使用的是[Digital Ocean](https://digitalocean.com) $5 一个月的配置:  
  `8 GB Memory / 4 Intel vCPUs / 160 GB Disk / NYC1 - Ubuntu 20.04 (LTS) x64`  
  初始化的时候可以选择是否只允许 ssh 登录
- 域名在 [GoDaddy](https://godaddy.com) 上购买的 `.xyz` 的辣鸡域名，15 块包年

- DNS 托管服务  
  [How To Point to DigitalOcean Nameservers From Common Domain Registrars](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars)

- [Digital Ocean 关于 DNS 和 Domain 的教程](https://docs.digitalocean.com/products/networking/dns/)

- [DNS Lookup](https://www.digitalocean.com/community/tools/dns) 或者使用 dig 命令  
   [How To Use Dig, Whois, & Ping on an Ubuntu VPS to Query DNS Data
  ](https://www.digitalocean.com/community/tutorials/how-to-use-dig-whois-ping-on-an-ubuntu-vps-to-query-dns-data)

## 安装 nginx & 设置 server block (virtual hosts) {#nginx-and-server-block}

- [How To Install Nginx on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)，注意 ufw 防火墙设置
- [Nginx Beginner’s Guide](http://nginx.org/en/docs/beginners_guide.html) Nginx 官方教程
- 注意在开启 ufw 防火墙之前要允许**ssh**端口

## SSH 常见的问题 {#ssh}

- 创建新用户，并加入 sudo 用户组  
   [Initial Server Setup with Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04) step 2  
- 允许/屏蔽使用密码进行 ssh 连接  
  [Initial Server Setup with Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04)  step 5
- 新建的用户，只有密码如何才能配置通过 ssh key 访问  
  [Initial Server Setup with Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04) step 5
- 如果 ssh 连接不上，如何打开调试  
  我就遇到过上面的步骤一步步来，但是就是连接不上，不知道哪一步可能有些微小的问题。ssh 客户端和服务端都是可以debug 的。  
  [SSH-Key authentication fails](https://superuser.com/questions/1137438/ssh-key-authentication-fails) 这里有如何开启调试的[回答](https://superuser.com/a/1318764)

- vscode 中使用 `~/.ssh/config` 配置文件连接 remote SSH 要注意哪些？  
  [vscode ssh remote 官方文档](https://code.visualstudio.com/blogs/2019/10/03/remote-ssh-tips-and-tricks)

  ```yaml
    # dont use root@<ip address> as HOST, caution!!! vscode will treat is as as server instead of a name 
    Host root
        HostName <your_host_ip_address>
        User root

    Host aNameWithoutAt
        HostName <your_host_ip_address>
        IdentityFile ~/.ssh/do_qi_id_rsa # do not use relative path here!
        User <your_username>
  ```

## 关于 HTTPS 证书 {#https}

- 使用免费的 lets encrypt  
  [How To Secure Nginx with Let's Encrypt on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)
- [目前不支持通配符（wildcard），要增加 subdomain 怎么做](https://community.letsencrypt.org/t/how-can-i-add-more-subdomains-to-my-ssl-certificate/33711)  


## 关于 Github Pages 的 custom domain 设置 {#github-pages-custom-domain}

- 分为 subdomain 和 apex domain，生效需要时间  
  [Configuring a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## 关于 Github Actions {#github-actions}

- [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)

## 关于 mongodb {#mongodb}

- 参考官方文档（community version）

## 关于 docker {#docker}

- [How To Install and Use Docker on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)
  
## 总结 {#summary}

Digital Ocean 的文档真香！
