loadInner();

window.onunload = refresh_doctorinfo();

function doctor_group() {
    window.location.hash = event.target.id; //设置锚点
    loadInner();
}

function refresh_doctorinfo() {

    $.ajax({
        type: "POST",
        url: config.base_url + "User",
        data: "token=" + checktoken(),
        success: function (data) {
            if(data.succ == 1){
                //保存用户信息到cookie
                var exp = new Date();
                if(data.data.token_valid_time > 0){
                    //设置过期时间
                    exp.setTime(exp.getTime() + 1000 * 60 * data.data.token_valid_time); //计算毫秒
                    document.cookie = "data=" + JSON.stringify(data.data) + ";expires=" + exp.toGMTString();
                }
                else {
                    document.cookie = "data=" + JSON.stringify(data.data);

                }
                $("#username-head").text(data.data.nickname);
                $("#profile-name").text(data.data.nickname);
                $("#profile-phone").text(data.data.phone);
                $("#avatar-head").attr('src',config.img_url + data.data.avatar);
                $("#profile-avatar").attr('src',config.img_url + data.data.avatar);
                $('#profile-create-time').text(data.data.create_time);
                $('#profile-last-login').text(data.data.token_create_time);
            }
            else {
                alert_error(data.error);
            }
        }
    });

}

