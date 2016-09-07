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

const [path, fs, markdownIt] = [require("path"), require("fs"), require("markdown-it")];
const [split, md] = ["**", new markdownIt({
    html: true,
    langPrefix: "code-"
})];

/**
 * 去掉文件名中的拓展名
 *
 * @param name
 * @returns {Array.<T>|string|Blob|ArrayBuffer}
 */
function stripExtName(name) {
    let i = 0 - path.extname(name).length; // 获取后缀名的下标
    if (0 === i) i = name.length;
    return name.slice(0, i); // 直接截取
};

/**
 * 将markdown 转化为HTML
 * @param content
 */
function markDownToHtml(content = "") {
    return md.render(content);
};

/**
 * 处理元数据
 *
 * @param content
 * @returns {Object}
 */
function parseSourceContent(content = "") {
    let i = content.indexOf(split);
    let info = new Object;
    if (-1 !== i) {
        let j = content.indexOf(split, i + split.length);
        if (-1 !== j) {
            let str = content.slice(i + split.length, j).trim();
            content = content.slice(j + split.length);

            str.split("\n").map(line => {
                let i = line.indexOf(":");
                if (-1 !== i) {
                    let name = line.slice(0, i).trim();
                    let value = line.slice(i + 1).trim();
                    info[name] = value;
                }
            });
        }
    }

    info.source = content;
    return info;
};

module.exports = function* (next) {
    let name = stripExtName(this.params["0"]),
        file = path.resolve(this.dir, "_browse", `${name}.md`),
        content = yield fs.readFile.bind(fs, file), html;
    content = parseSourceContent(content.toString());
    html = markDownToHtml(content.source);

    yield this.render("browse", {
        title: content.title || name,
        date: content.date || new Date().toLocaleString(),
        auth: content.auth || "佚名",
        html
    });
    return yield next;
};
