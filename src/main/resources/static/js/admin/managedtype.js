window.onload = init_type_table();

function init_type_table() {

    $('#dtype').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,
        search: true,

        url:config.base_url + "doctortype",

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
                field: 'type',
                title: '医生类型'
            },
            {
                field: 'price',
                title: '咨询价格'
            },
            {
                title: '操作',
                align: "center",
                events: "operateEvents",
                formatter: function (value, row, index) {
                    return [
                        '<div id="edit" class="glyphicon glyphicon-edit" data-toggle="modal" data-target="#edit-modal" style="cursor:pointer"></div>'
                    ].join("");
                }
            }
        ]
    });

    $('#xls-list').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,

        onLoadSuccess: function(){  //加载成功时执行

            return "加载成功";
        },
        onLoadError: function(){  //加载失败时执行
            return "加载数据失败";
        },
        striped:true,

        columns: [
            {
                field: '医生类型',
                title: '医生类型'
            },
            {
                field: '咨询价格',
                title: '咨询价格'
            }
        ]
    });
}

function create() {
    var token = checktoken();
    $("#bOK1").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "doctortype/create",
        data: {
            'token':token,
            'type':$("#type1").val(),
            'price':$("#price1").val()
        },
        success: function (data) {
            $("#bOK1").attr("disabled",false).text("提交");
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        医生类型添加成功,一秒后自动刷新本页面\n" +
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


function update() {
    var token = checktoken();
    $("#bOK2").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "doctortype/update",
        data: {
            'token':token,
            'type_id':$("#type_id").val(),
            'type':$("#type2").val(),
            'price':$("#price2").val()
        },
        success: function (data) {
            $("#bOK2").attr("disabled",false).text("提交");
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        医生类型修改成功,一秒后自动刷新本页面\n" +
                    "                    </div>";
                $("#alertmessage2").append(succ_message);
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
                $("#alertmessage2").append(error_message);
            }
        }
    });
}

window.operateEvents = {
    'click #edit': function (e, value, row, index) {
        $('#type2').val(row.type);
        $('#price2').val(row.price);
        $('#type_id').val(row.id);
    }
};



