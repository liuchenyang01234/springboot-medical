// 新增患者信息
$("#bOK").on('click',function () {

    var token = checktoken();

    var sex = $('input:radio[name="sex"]:checked').val();


    if (!isName($("#pname").val())) {
        var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
            "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
            "姓名格式不正确" + "</div>";
        $("#alertmessage").append(error_message);
    }

    if (!isPoneAvailable($("#phone").val())) {
        var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
            "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
            "手机号码格式错误" + "</div>";
        $("#alertmessage").append(error_message);
    }

    if (isName($("#pname").val()) && isPoneAvailable($("#phone").val())){
        $("#bOK").attr("disabled",true).text("正在提交...");
        $.ajax({
            type: "POST",
            url: config.base_url + "userprofile/create",
            data: {
                'token':token,
                'name':$("#pname").val(),
                'sex':sex,
                'birth':$("#birthday").val(),
                'address':$("#province").val() + $("#city").val() + $("#district").val(),
                'phone':$("#phone").val()
            },
            success: function (data) {
                $("#bOK").attr("disabled",false).text("提交");
                if(data.succ == 1){
                    var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                        "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                        "                        患者信息添加成功,一秒后自动刷新本页面\n" +
                        "                    </div>";
                    $("#alertmessage").append(succ_message);
                    //页面需要刷新
                    // location.reload();
                    setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                        window.location.reload();//页面刷新
                    },1500);
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

});

// 编辑患者信息
$("#bOK1").on('click',function () {

    var token = checktoken();
    var id = $('#getID').text();

    var sex = $('input:radio[name="sex"]:checked').val();

    $("#bOK1").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "userprofile/update",
        data: {
            'profile_id':id,
            'token':token,
            'name':$("#pname1").val(),
            'sex':sex,
            'birth':$("#birthday1").val(),
            'address':$("#province1").val() + $("#city1").val() + $("#district1").val(),
            'phone':$("#phone1").val()
        },
        success: function (data) {

            $("#bOK1").attr("disabled",false).text("提交");
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        患者信息修改成功,一秒后自动刷新本页面\n" +
                    "                    </div>";
                $("#alertmessage1").append(succ_message);
                //页面需要刷新
                setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                    window.location.reload();//页面刷新
                },1500);
            }
            else {
                var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    data.error + "</div>";
                $("#alertmessage1").append(error_message);
            }
        }
    });
});