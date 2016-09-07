/**!
 * cynomys.jwis.cn - controller/index.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

const path = require("path");
const [home,browse] = [require(path.join(__dirname, "home")), require(path.join(__dirname, "browse"))];

module.exports = app => {
    app.get("/", home);// 博客首页
    app.get("/browse/*", browse); //渲染文章
};
