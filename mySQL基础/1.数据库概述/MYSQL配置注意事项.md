# MYSQL 安装注意事项

1. MYSQL 启动的端口号默认为 3306

2. 设置 MYSQL 数据库的字符编码方式为 utf-8

3. MYSQL 超级管理员的用户名不能改，一定是 root
但是需要设置超级管理员的密码

## MYSQL 卸载

删除目录：
把 C:\Program Files (x86) 目录下的 MYSQL 文件夹删除
把 C:\ProgramData 目录下的 MYSQL 文件夹删除

## MYSQL服务在哪里

计算机 --->右键 --->管理 --->服务和应用程序 --->服务 --->找到MYSQL服务
MYSQL 服务，默认情况下是"启动"状态，下一次重启操作系统时自动启动该服务

## 怎样通过操作系统命令来启动和关闭 MYSQL 服务

- net stop 服务名称

- net start 服务名称

## 启动之后登录 MYSQL 数据库

使用 bin 目录下的 mysql.exe 命令来连接 mySQL 数据库服务器

D:\mysql\mysql-5.6.46-winx64\bin>mysql -u root -p
Enter password: ********
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 1
Server version: 5.6.46 MySQL Community Server (GPL)

Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

出现以上字样表示登陆成功
