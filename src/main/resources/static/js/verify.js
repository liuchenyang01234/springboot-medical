/**
 * 正则验证页面输入
 */

/**
 *  1打头 第二位3,4,5,7,8 后面无所谓
 * @param $poneInput
 * @returns {boolean}
 */

function isPoneAvailable( str ) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 2-20个汉字
 * @param name
 * @returns {boolean}
 */
function isName(name) {
    var myreg = /^[\u4e00-\u9fa5 ]{2,20}$/;
    if (!myreg.test(name)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 用户名正则，4到16位（字母，数字，下划线，减号）
 * @param name
 * @returns {boolean}
 */

function isUserName(name) {
    var myreg = /^[a-zA-Z0-9_-]{5,16}$/;
    if (!myreg.test(name)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 邮箱格式
 * @param mail
 * @returns {boolean}
 */
function isEmail(mail) {
    var myreg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!myreg.test(mail)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 6-20位字母数字的组合
 * @param password
 * @returns {boolean}
 */

function password(pwd) {
    var myreg = /^[A-Za-z0-9]{6,20}$/;
    if (!myreg.test(pwd)) {
        return false;
    } else {
        return true;
    }
}



