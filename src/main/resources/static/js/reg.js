function test() {
    sendsms();
    time(document.getElementById("getInfoCode"));
}

function sendsms() {
    var nickname = $("#username").val();
    var password = $("#pwd").val();
    var phone = $("#phone").val();

    $.ajax({
        url: config.base_url + "Smscode/send",
        type: 'post',
        dataType: 'json',
        data: {
            nickname: nickname,
            password: password,
            phone: phone,
            action: "REG"
        },
        success: function (data) {
            if(data.succ == 0){
                alert_error(data.error);
            }
            else if(data.succ == 1){
                // document.getElementById("getInfoCode").onclick=function(){time(document.getElementById("getInfoCode"));}
            }

        }

    });
}

function reg_func() {
    var nickname = $("#username").val();
    var password = $("#pwd").val();
    var phone = $("#phone").val();
    //现在验证码没有用到
    var code = $("#code").val();
    //现在类型只是为1
    var typeId =1;
    var data=new Object();
    data.nickname=nickname;
    data.password=password;
    data.phone=phone;
    data.typeId=typeId;
    $.ajax({
        url:config.base_url+"/register/create",
        type: 'post',
        dataType: 'json',
        data:JSON.stringify(data),
        contentType:"application/json;charset=utf-8",
        success: function (data) {
            if(data.succ == 1){
                //保存用户信息到cookie
                //设置过期时间
                var exp = new Date();
                exp.setTime(exp.getTime() + 1000 * 60 * 5)
                document.cookie = "token=" + data.token + ";path=/;expires=" + exp.toGMTString() + ";http=true";
                console.log("data.token   "+data.token);
                //跳转个人中心页面
                if(data.typeId == 1)
                    window.location.href= '/patient/info'
                // loginhandele();
                //window.location.href = '/patient/info';
                else if(data.typeId == 2)
                    window.location.href = '/doctor/doctorinfo';
                else if(data.typeId == 3)
                    window.location.href = '/admin/admin';
            }
            else {
                alert_error(data);
            }
        }

    });
}