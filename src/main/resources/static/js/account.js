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
            token: checktoken(),
            old_phone: $("#old_phone").val(),
            phone: $("#new_phone").val(),
            action: "CHANGEPHONE"
        },
        success: function (data) {
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        发送成功\n" +
                    "                    </div>";
                $("#alertmessage3").append(succ_message);
            }
            else{
                var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    data.error + "</div>";
                $("#alertmessage3").append(error_message);
            }
        }

    });
}

function change_pwd() {
    var new_pwd1 = $("#newpwd1").val();
    var new_pwd2 = $("#newpwd2").val();
    $("#submit_pwd").attr("disabled",true).text("正在提交...");

    if (new_pwd1 != new_pwd2 || new_pwd1.length < 8){
        $("#submit_pwd").attr("disabled",false).text("提交");

        var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
            "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
            "两次输入密码不一致或少于八位" + "</div>";
        $("#alertmessage2").append(error_message);
        return;
    }
    $.ajax({
        url:config.base_url + "User/changepwd",
        type: 'post',
        dataType: 'json',
        data: {
            token: checktoken(),
            password: $("#password").val(),
            new_pwd: $("#newpwd1").val()
        },
        success: function (data) {
            $("#submit_pwd").attr("disabled",false).text("提交");

            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        密码修改成功\n" +
                    "                    </div>";
                $("#alertmessage2").append(succ_message);
                //页面需要刷新
                // location.reload();
                // setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                //     window.location.reload();//页面刷新
                // },1500);
            }

            else {
                var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    data.error + "</div>";
                $("#alertmessage2").append(error_message);
            }
        }

    });

}

function edit_phone() {

    $("#submit_phone").attr("disabled",true).text("正在提交...");

    $.ajax({
        url:config.base_url + "User/updatephone",
        type: 'post',
        dataType: 'json',
        data: {
            token: checktoken(),
            old_phone: $("#old_phone").val(),
            phone: $("#new_phone").val(),
            code: $("#code").val()
        },
        success: function (data) {
            $("#submit_phone").attr("disabled",false).text("提交");

            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        手机号修改成功\n" +
                    "                    </div>";
                $("#alertmessage3").append(succ_message);
                //页面需要刷新
                // location.reload();
                // setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                //     window.location.reload();//页面刷新
                // },1500);
            }

            else {
                var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    data.error + "</div>";
                $("#alertmessage3").append(error_message);
            }
        }

    });
}