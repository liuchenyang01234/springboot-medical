function login() {
    var username = document.getElementById("form-username").value;
    var password = document.getElementById("form-password").value;
    var data=new Object();
    data.username=username;
    data.password=password;
    $.ajax({
        //Ajax调用处理
        type: "POST",
        url: config.base_url + "/loginhandle",
        dataType:'json',  //json 返回值类型
        data: JSON.stringify(data),
        contentType:"application/json;charset=utf-8",
        success: function (data) {
            if(data.succ== 1){
                //保存用户信息到cookie
           /*     var exp = new Date();
                if(data.data.token_valid_time > 0){
                    //设置过期时间
                    exp.setTime(exp.getTime() + 1000 * 60 * data.data.token_valid_time); //计算毫秒*/
                //设置过期时间
                     var exp = new Date();
                    exp.setTime(exp.getTime() + 1000 * 60 * 5)
                     document.cookie = "token=" + data.token + ";path=/;expires=" + exp.toGMTString() + ";http=true";
                   // document.cookie = "token=" + data.token + ";expires=" + exp.toGMTString() + ";http=true";
                    console.log("data.token   "+data.token);
                   // document.cookie = "data=" + JSON.stringify(data.data) + ";expires=" + exp.toGMTString();
             /*       if (data.data.type_id == 2)
                        document.cookie = "did=" + data.doctor_id + ";expires=" + exp.toGMTString();
                }
                else {
                    document.cookie = "token=" + data.token;
                    document.cookie = "data=" + JSON.stringify(data.data);
                    if (data.data.type_id == 2)
                        document.cookie = "did=" + data.doctor_id;
                }*/
                //跳转个人中心页面
                if(data.type_id == 1)
                    window.location.href= '/patient/info'
                       // loginhandele();
                    //window.location.href = '/patient/info';
                else if(data.type_id == 2)
                    window.location.href = '/doctor/doctorinfo';
                else if(data.type_id == 3)
                    window.location.href = '/admin/admin';
            }
            else {
                alert_error(data);
            }
        }
    });
}


function logintoken() {

    $.ajax({
        //Ajax调用处理
        type: "POST",
        url: config.base_url + "login/loginhandle",
        dataType:'json',  //json 返回值类型
        data: JSON.stringify(data),
        contentType:"application/json;charset=utf-8",
        success: function (data) {
            if(data.succ== 1){
                //保存用户信息到cookie
                /*     var exp = new Date();
                     if(data.data.token_valid_time > 0){
                         //设置过期时间
                         exp.setTime(exp.getTime() + 1000 * 60 * data.data.token_valid_time); //计算毫秒*/
                document.cookie = "token=" + data.token;
                // document.cookie = "data=" + JSON.stringify(data.data) + ";expires=" + exp.toGMTString();
                /*       if (data.data.type_id == 2)
                           document.cookie = "did=" + data.doctor_id + ";expires=" + exp.toGMTString();
                   }
                   else {
                       document.cookie = "token=" + data.token;
                       document.cookie = "data=" + JSON.stringify(data.data);
                       if (data.data.type_id == 2)
                           document.cookie = "did=" + data.doctor_id;
                   }*/
                //跳转个人中心页面
                if(data.type_id == 1)
                    window.location.href = 'info.html';
                else if(data.type_id == 2)
                    window.location.href = 'doctorinfo.html';
                else if(data.type_id == 3)
                    window.location.href = 'admin.html';
            }
            else {
                alert_error(data);
            }
        }
    });
}
function find_pwd() {
    var password = $("#password").val();
    $("#bOK").attr("disabled",true).text("正在提交...");

    if (password.length < 8){
        $("#bOK").attr("disabled",false).text("提交");
        var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
            "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
            "新密码少于八位" + "</div>";
        $("#alertmessage").append(error_message);
        return;
    }
    $.ajax({
        url:config.base_url + "User/findpwd",
        type: 'post',
        dataType: 'json',
        data: {
            phone: $("#phone").val(),
            password: $("#password").val(),
            code: $("#code").val()
        },
        success: function (data) {
            $("#bOK").attr("disabled",false).text("提交");

            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        密码修改成功\n" +
                    "                    </div>";
                $("#alertmessage").append(succ_message);
            }

            else {
                var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    data.error + "</div>";
                $("#alertmessage").append(error_message);
            }
        }

    });
}

function send() {
    sendsms();
    time(document.getElementById("getInfoCode"));
}

function sendsms() {
    $.ajax({
        url: config.base_url + "Smscode/send",
        type: 'post',
        dataType: 'json',
        data: {
            phone: $("#phone").val(),
            action: "FINDPWD"
        },
        success: function (data) {
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        发送成功\n" +
                    "                    </div>";
                $("#alertmessage").append(succ_message);
            }
            else{
                var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    data.error + "</div>";
                $("#alertmessage").append(error_message);
            }
        }

    });
}