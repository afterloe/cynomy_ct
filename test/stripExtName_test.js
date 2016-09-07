/**
 * Created by afterloe on 2016/9/7.
 *
 * @mail afterloeliu@jwis.cn
 * @version 1.0.0
 */
const path = require("path");

function stripExtName(name) {
    let i = 0 - path.extname(name).length; // 获取后缀名的下标
    if (0 === i) i = name.length;
    return name.slice(0, i); // 直接截取
};

console.log(stripExtName("Document of API URI.html"));

console.log(4 % 2 == 0);