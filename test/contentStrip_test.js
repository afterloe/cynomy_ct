/**
 * Created by afterloe on 2016/9/7.
 *
 * @mail afterloeliu@jwis.cn
 * @version 1.0.0
 */
let content = `**
title: Cynomys_market RESTful API Document
date: 2016-9-7 13:56:28
auth: afterloe (afterloeliu@jwis)
**
![jwi](http://www.jwis.cn/web_file/images/logo2.png "jwi logo")

> Copyright(c) afterloe. ISC Licensed
> Version: v0.0.1
> ModifyTime: 2016-8-24 10:50:17
> Authors:
    afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
> Host:
    https://market.cynomys.jwis.cn:10030/

## Overview
1. [Https request](#Https_request)
    1.1 [发起参数](#Https_request_1)
2. [Https header](#Https_header)
    2.1 [发起参数](#Https_header_1)
3. [User](#User)
    3.1 [登录](#User_1)
    3.2 [注册](#User_2)
    3.3 [注销](#User_3)
    3.4 [冻结用户](#User_4)
    3.5 [获取用户信息](#User_5)
    3.6 [获取相似用户](#User_6)
    3.7 [查询用户](#User_7)
    3.8 [找回用户密码](#User_8)
4. [Application](#Application)
    4.1 [创建应用](#Application_1)
    4.2 [修改应用](#Application_2)
    4.3 [删除应用](#Application_3)
    4.4 [获取应用详情](#Application_4)
    4.5 [应用列表[时间]](#Application_5)
    4.6 [应用列表[热度]](#Application_6)
    4.7 [应用搜索](#Application_7)
    4.8 [推荐应用](#Application_8)
    4.9 [点赞](#Application_9)
    4.10 [取消点赞](#Application_10)
    4.11 [获取相似应用](#Application_11)
    4.12 [应用下载](#Application_12)
    4.13 [应用下载[指定版本]](#Application_13)
5. [Common](#Common)
    5.1 [获取应用评论](#Common_1)
    5.2 [查询应用被哪些用户安装过](#Common_2)
6. [Forum](#Forum)
    6.1 [获取应用评论](#Forum_1)
    6.2 [发布评论](#Forum_2)
    6.3 [删除评论](#Forum_3)
-------------

### Https request


### Request Header
$ curl -i https://market.cynomys.jwis.cn:10030/

    HTTP/1.1 200 OK

{
    "Accept" : "image/webp,image/*,*/*;q=0.8",
    "Accept-Encoding" :"gzip, deflate",
    "Accept-Language":"zh-CN,zh;q=0.8",
    "Cache-Control":"max-age=0",
    "Connection": "keep-alive",
    "Host":"ic.tynt.com",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 BIDUBrowser/8.4 Safari/537.36",
    "Origin":"Cynomys_market_registry",
    "equipmentId":"9D63ED40-F9D0-471D-A1ED-6E9FA8CE902B",
    "pid": "bba7f264ccb94740a80fad7788da223e",
    "equipmentType" : "pcDevice"
}

+ 获取用户信息
GET /user/details/:userId

+ 获取相似用户
GET /user/similarList/:userId

+ 查询用户
GET /user/search/:page

+ 找回用户密码
PUT /user/security/findPwd/:userMail


### Application
+ 创建应用
POST /app/create

+ 修改应用
PUT /app/modify/:appId

+ 删除应用
DELETE /app/remove/:appId

+ 获取应用详情
GET /app/details/:appId

+ 应用列表[时间]
GET /app/list/:page

+ 应用列表[热度]
GET /app/list/hot/:page

+ 应用搜索
GET /app/search/:appName/:page

+ 推荐应用
GET /app/list/popular/:page

+ 点赞
PUT /app/like/:appId

+ 取消点赞
DELETE /app/like/:appId

+ 获取相似应用
GET /app/similarList/:appId/:page

+ 应用下载
GET /app/download/:appId

+ 应用下载[指定版本]
GET /app/download/:name/:version

### Common
+ 查询用户的应用列表
GET /common/appList/:id/:page

+ 查询应用被哪些用户安装过
GET /common/userList/:id/:page

### Forum
+ 获取应用评论
GET /forum/app/:appId/:page

+ 发布评论
POST /forum/app/:appId

+ 删除评论
DELETE /forum/:forumId`;


let split = "**\n";

let i = content.indexOf(split);
let info = new Object;

if(-1 !== i) {
    let j = content.indexOf(split, i + split.length);
    if(-1 !== j) {
        let str = content.slice(i + split.length, j).trim();
        content = content.slice(j + split.length);

        str.split("\n").map(line => {
            let i = line.indexOf(":");
            if(-1 !== i) {
                let name = line.slice(0,i).trim();
                let value = line.slice(i + 1).trim();
                info[name] = value;
            }
        });
    }
}

info.source = content;

console.log(info);