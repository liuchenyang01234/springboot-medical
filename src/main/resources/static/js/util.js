var config = {
    base_url:"http://localhost:8080",
    img_url:"http://139.196.90.212:8080/ma/zxy/public/uploads/",
    download_url:"http://139.196.90.212:8080/ma/zxy/public/downloads",
    doctor_live_url:"https://class.csslcloud.net/index/presenter/?userid=5B85FDD2600912FE&roomid=",
    patient_live_url:"https://class.csslcloud.net/index/talker/?userid=5B85FDD2600912FE&roomid="
};

/* 获取指定cookie */
function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split(";");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if ($.trim(arr[0]) == name)
            return arr[1];
    }
    return "";
}

function getInfoFromCookie(name) {
    var data = getCookie('data');
    data = JSON.parse(data);
    return data[name];
}

//读取token
function checktoken() {
    if(!getCookie('token')){
        //todo:弹框提示登录已失效
        window.location.href = "login.html";
        return;
    }
    return getCookie('token');
}

//todo:退出登录
function logout() {
    alert("logout");
}

//右上角错误提示
function alert_error(error) {
    $.notify({
        title: '<strong>错误：</strong>',
        message: error
    },{
        type: 'danger'
    });
}

function loadInner(){
    var sId = window.location.hash;
    var pathn, i, data;
    pathn = sId.replace("#","");
    if(!pathn){
        if (getInfoFromCookie('type_id') == 1){
            pathn = "baseinfo.html";
            refresh_userinfo();
        }
        else if (getInfoFromCookie('type_id') == 2){
            pathn = "doctor_baseinfo.html";
            refresh_doctorinfo();
        }
        else if (getInfoFromCookie('type_id') == 3){
            pathn = "admin_baseinfo.html";
            refresh_admininfo();
        }

    }
    // else if(pathn.indexOf('recordlist') >= 0 && event.target.value !== null){
    //     pathn = pathn + ".html";
    //     if(pathn.indexOf('profile_id') < 0)
    //         window.location.hash += "?profile_id=" + event.target.value;
    //     else
    //         pathn = pathn.split("?")[0] + ".html";
    // }
    else
        pathn = pathn + ".html";
    $("#info-content").load(pathn); //加载相对应的内容
}

//获取get参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//获取下一个周x的日期
function getdate(day) {
    var length = day - new Date().getDay();
    if (length <= 0)
        length += 7;
    var date = new Date();
    date.setDate(date.getDate() + length);
    var month = date.getMonth() + 1;
    return date.getFullYear() + '年' + month + '月' + date.getDate() + '日';
}

//获取当前日期，格式为YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}


//顶部导航栏公共操作

//全屏切换
function fulls() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        $('body').addClass("full-screen");
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        $('body').removeClass("full-screen");
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

//侧边栏隐藏展开
function switch_sidebar() {
        var toggleButton = $('#toggle-sidebar');
        var toggleIcon = toggleButton.find('i');
        //sidebar
        $('#sidebar').toggleClass('hide-sidebar');
        if($('#sidebar').hasClass('hide-sidebar')) {
            toggleIcon.css("transform","rotate(-180deg)");
        } else {
            toggleIcon.css("transform","rotate(0deg)");
        }

}