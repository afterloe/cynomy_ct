/**
 * Created by afterloe on 2016/9/7.
 *
 * @mail afterloeliu@jwis.cn
 * @version 1.0.0
 */
const fs = require("fs"), path = require("path");

let arr = new Array;

function readDir(_path, regular) {
    let status = fs.statSync(_path);
    if (status.isDirectory()) {
        let list = fs.readdirSync(_path);
        list.map(file => readDir(path.resolve(_path, file), regular));
    } else {
        if (regular.test(_path))
            arr.push({path: path.basename(_path)});
    }
};

readDir(`F:/webStorm project/cynomys_ct/public`, /\.js/);

console.log(arr);