window.onunload = load_profile();

var record_id,profile_id;

function initImage() {
    $(function() {
        $("#imageFile").fileinput({
            uploadUrl: config.base_url+ "Recordimage/upload" , //上传的地址  ?token="+checktoken()+"&type=doctor
            language: "zh",
            showCaption: true,              //是否显示标题
            uploadAsync: true,
            showUpload: true,               //是否显示上传按钮
            showRemove: true,               //是否显示移除按钮
            showPreview: true,                //是否显示预览按钮
            allowedFileExtensions: ["jpg", "jpeg","bmp","png"], //接收的文件后缀
            // previewSettings: {
            //     image: {width: "100px", height: "100px"},
            // },
            // uploadExtraData: {  //上传的时候，增加的附加参数
            //     token:checktoken(),
            //     profile_id:profile_id,
            //     record_id:record_id,
            //     type_id:$("#type").val()
            //
            //
            //     // folder: '数据导入文件', guid: $("#AttachGUID").val()
            // },
            uploadExtraData: function(previewId, index) {   //额外参数的关键点
                var obj = {};
                obj.token = checktoken();
                obj.profile_id = profile_id;
                obj.record_id = record_id;
                obj.type_id = $("#type").val();

                console.log(obj);
                return obj;
            }
        })
            .on('fileuploaded',function (event, data, previewId, index) {
                var res = data.response;
                console.log(res);
                bsStep(3);
            })
            .on('filepreupload',function (event, data, previewId, index) {
                var res = data.response;
                console.log(res);
                bsStep(3);
            })

    });
}


function load_profile() {
    $("#step2").hide();
    var token = checktoken();

    $.ajax({
        type: "POST",
        url: config.base_url + "userprofile",
        data: {
            'token':token,
            'profile_id':0
        },
        success: function (data) {
            if(data.succ == 1){
                var profiles = data.data;
                var htmls = "";
                for(var i in profiles){
                    htmls += "<option value=" + profiles[i].id + ">" + "患者姓名:" + profiles[i].name + "   生日:" + profiles[i].birth + "</option>";
                }
                $("#profile").empty().append(htmls);
            }
            else {
                alert_error(data.error);
            }
        }
    });
}


$("#submit").on('click',function () {

    var token = checktoken();

    profile_id = $("#profile").val();

    $("#submit").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "medicalrecord/create",
        data: {
            'token':token,
            'profile_id':profile_id,
            'visit_time':$("#visit_time").val().replace("年","-").replace("月","-").replace("日","-"),
            'hospital':$("#hospital").val(),
            'description':$("#description").val()
        },
        success: function (data) {
            if(data.succ == 1){
                $("#step1").hide();
                bsStep(2);
                record_id = data.data;
                $("#step2").show();
                loadtype();
            }
            else {
                var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    data.error + "</div>";
                $("#alertmessage").append(error_message);
                $("#submit").attr("disabled",false).text("下一步");
            }
        }
    });
});

function loadtype() {
    var htmls = "";
    $.ajax({
        type: "GET",
        url: config.base_url + "recordimage/imagetype",
        success: function (data) {
            for(var i in data){
                htmls += "<option value=" + data[i].id + ">" + data[i].type + "</option>";
            }
            $("#type").empty().append(htmls);
            initImage();
        }
    });
}


$("#select").click(function () {
    var temp = $("#type").val();
    console.log(temp);
})
