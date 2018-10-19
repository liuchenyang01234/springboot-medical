window.onload = init_table();

function init_table() {

    $('#range').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,
        search: true,

        url:config.base_url + "timerange",

        onLoadSuccess: function(){  //加载成功时执行

            return "加载成功";
        },
        onLoadError: function(){  //加载失败时执行
            return "加载数据失败";
        },
        striped:true,

        columns: [
            {
                field: 'id',
                title: '编号',
                align: 'center',
                width: 50 + "px"
            },
            {
                field: 'range',
                title: '时间段'
            },
            {
                field: 'begin',
                title: '开始时间'
            },
            {
                field: 'end',
                title: '结束时间'
            }
        ]
    });

    $('#datetimepicker1').datetimepicker({
        format: 'HH:mm',
        locale: moment.locale('zh-cn')
    });
    $('#datetimepicker2').datetimepicker({
        format: 'HH:mm',
        locale: moment.locale('zh-cn')
    });
}

function create() {
    var token = checktoken();
    $("#bOK1").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "timerange/create",
        data: {
            'token':token,
            'begin':$("#begin").val(),
            'end':$("#end").val()
        },
        success: function (data) {
            $("#bOK1").attr("disabled",false).text("提交");
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        时间段添加成功,一秒后自动刷新本页面\n" +
                    "                    </div>";
                $("#alertmessage1").append(succ_message);
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
                $("#alertmessage1").append(error_message);
            }
        }
    });
}




