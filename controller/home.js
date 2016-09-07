/**!
 * cynomys.jwis.cn - controller/home.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

const [path,fs] = [require("path"), require("fs")];
let fileList = new Array;

/**
 * 读取目录
 *
 * @param _path
 * @param regular
 */
function readDir(_path, regular) {
    let status = fs.statSync(_path);
    if (status.isDirectory()) {
        let list = fs.readdirSync(_path);
        list.map(file => readDir(path.resolve(_path, file), regular));
    } else {
        if (regular.test(_path))
            fileList.push({name: path.basename(_path, ".md"), status: status});
    }
};

module.exports = function* (next) {
    let sourceDir = path.resolve(this.dir, "_browse");
    if (0 === fileList.length) {
        readDir(sourceDir, /\.md$/);
    }

    // 按照创建时间排序
    fileList.sort((a, b) => {
        return a.status.ctime.timestamp - b.status.ctime.timestamp;
    });

    yield this.render("home", {
        title: "welcome join us",
        list: fileList
    });

    return yield next;
};
