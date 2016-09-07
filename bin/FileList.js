/**
 * Created by afterloe on 2016/9/7.
 *
 * @mail afterloeliu@jwis.cn
 * @version 1.0.0
 */

class FileList extends Array {
    constructor(...args) {
        super(...args);
    }

    push(file) {
        let {path, status} = file;
        super.map(f => {

        });
    }
}

module.exports = FileList;