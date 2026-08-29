---
title: "Linux安装php-fpm"
date: 2021-02-22
updated: 2021-02-24
tags: ["Linux","php"]
section: "engineering"
---
主要参考文章：[Linux安装PHP-FPM](https://blog.csdn.net/weixin_41752294/article/details/90181805)

跟着做的时候踩坑了，在此记录下踩的坑，并排坑。

注：参考文章于2019年5月发布！

## 安装编译环境

```
yum -y install epel-release
yum -y install gcc automake autoconf libtool make gcc-c++ glibc libmcrypt-devel mhash-devel libxslt-devel libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libxml2 libxml2-devel zlib zlib-devel glibc glibc-devel glib2 glib2-devel bzip2 bzip2-devel ncurses ncurses-devel curl curl-devel e2fsprogs e2fsprogs-devel krb5 krb5-devel libidn libidn-devel openssl openssl-devel libmcrypt mcrypt mhash  php-mcrypt
```

## 下载php版本包

php官方地址：[https://www.php.net/releases/](https://www.php.net/releases/)  
本次安装环境的版本包为php5.6，可以选择更高版本下载  

```
wget http://cn2.php.net/distributions/php-5.6.24.tar.gz
tar zvxf php-5.6.24.tar.gz
cd php-5.6.24
```

## 编译

php编译过程中，如果要php支持相应的功能，需要先安装对应的组件，然后再编译。  

```
./configure --prefix=/usr/local/php  --enable-fpm --with-mcrypt --enable-mbstring --disable-pdo --with-curl --disable-debug  --disable-rpath --enable-inline-optimization --with-bz2  --with-zlib --enable-sockets --enable-sysvsem --enable-sysvshm --enable-pcntl --enable-mbregex --with-mhash --enable-zip --with-pcre-regex --with-mysql --with-mysqli 
make && make install
```

  
此处可能会出现一些错误  
例如：

### 错误一

```
PHP configure: error: mcrypt.h not found. Please reinstall libmcrypt.
```

### 错误二

```
Don't know how to define struct flock on this system, set --enable-opcache=no
```

对于第一个，解决方法：  

```
wget ftp://mcrypt.hellug.gr/pub/crypto/mcrypt/attic/libmcrypt/libmcrypt-2.5.7.tar.gz
tar -zxvf libmcrypt-2.5.7.tar.gz
cd libmcrypt-2.5.7
./configure  --prefix=/usr/local
make
make install
```

  
(可以选择更高版本的进行下载，但是我为了方便(lan)就没有改)

对于第二个，解决方法：  

```
vim /etc/ld.so.conf.d/local.conf     # 编辑库文件
/usr/local/lib                       # 添加该行
:wq                                  # 保存退出
ldconfig -v                          # 使之生效
```

有的人可能会出现 make 时出错，这个应该是因为你编译时出错导致的，因此上述问题解决后重新 make && make install 即可

## 配置文件

复制配置文件，对其中一些代码进行修改，可根据需要开启php中的功能  

```
cp php.ini-development /usr/local/php/php.ini
cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
cp sapi/fpm/php-fpm /usr/local/bin
```

  
修改php-fpm.conf配置文件，使用www用户和www用户组运行（我为了方便用了我之前创建的其他用户组，注意此处不能用root）  

```
vim /usr/local/php/etc/php-fpm.conf
#修改为以下
; Unix user/group of processes
; Note: The user is mandatory. If the group is not set, the default user's group
;       will be used.
user = www
group = www
```

修改php.ini，根据需求开启需要的php功能  

```
vim /usr/local/php/php.ini
#############################
display_errors = On
display_startup_errors = On
error_prepend_string = "<br><font color=#ff0000>"
error_append_string = "</font><br><br>"
fastcgi.impersonate = 1
date.timezone = asia/Shanghai
extension=php_mysql.dll
extension=php_gd2.dll
extension=php_mbstring.dll
```

## 官方提醒

需要着重提醒的是，如果文件不存在，则阻止 Nginx 将请求发送到后端的 PHP-FPM 模块， 以避免遭受恶意脚本注入的攻击。  
将 php.ini 文件中的配置项 cgi.fix\_pathinfo 设置为 0 。  
打开 php.ini，定位到 cgi.fix\_pathinfo= 并将其修改为如下所示：  

```
vim /usr/local/php/php.ini
##########################
cgi.fix_pathinfo=0
```

## 运行

```
/usr/local/bin/php-fpm
#查看是否运行
netstat -anop | grep php
```

出现以下界面表示正常运行：  

## Nginx添加PHP支持

Nginx的配置文件中已经给出了模板，将root修改为网站目录即可，参考如下：  

```
location ~ .php$ {
root html；  #网站程序目录，根据需求修改
fastcgi_pass 127.0.0.1:9000；
fastcgi_index index.php；
fastcgi_param SCRIPT_FILENAME /html$fastcgi_script_name；  #/html 为网站程序目录
include fastcgi_params；
fastcgi_param   SCRIPT_NAME        $fastcgi_script_name;
}
```

## Apache添加PHP支持

若是要使用apache，编译时候需加上  

```
--with-apxs2=/usr/local/apache/bin/apxs
#apxs路径自行确认，如果是yum安装，没有找到apxs需要安装下httpd-devel组件
```

在httpd.conf添加以下配置：  

```
LoadModule php5_module modules/libphp5.so
##########################################
<FilesMatch \.php$>
    SetHandler application/x-httpd-php
</FilesMatch>
```

## 结果

访问80端口出现以下表示php配置完成。
