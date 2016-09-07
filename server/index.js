/**!
 * cynomys.jwis.cn - server/index.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

const [Koa, router, path, render, server, bodyParser] = [require("koa"), require('koa-router')(), require("path"), require("koa-ejs"), require("koa-static"), require('koa-bodyparser'), require("markdown-it")];
const [controller] = [require(path.join(__dirname, "..", "controller"))];

module.exports = dir => {
    dir = dir || ".";

    let app = new Koa();

    app.use(function *(next) {
        const start = new Date();
        this.dir = dir;
        yield next;
        const ms = new Date() - start;
        console.log(`${this.method} ${this.url} - ${ms}ms`);
    });

    app.use(bodyParser());
    app.use(server(path.join(__dirname, "..", "public"))); // 设置项目静态资源目录
    app.use(server(path.resolve(dir, "assets"))); // 设置文章静态资源的目录作为挂载目录

    controller(router);
    app.use(router.routes())
        .use(router.allowedMethods());

    render(app, {
        root: path.join(__dirname, "..", "views"),
        viewExt: "html",
        cache: false
    });

    app.use(function* (next) {
        yield next;
        if (this.error) {
            this.status = this.error_code || 404;
            yield this.render("notFound", {
                title: "error",
                msg: this.error.error_msg
            });
        }
    });

    app.listen(3000, () => console.log("server is running in 127.0.0.1:3000"));
};