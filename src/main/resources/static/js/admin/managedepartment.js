window.onload = init_de_table();

function init_de_table() {

    $('#departments').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,
        search: true,

        url:config.base_url + "department/detaillist",

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
                title: '科室编号',
                align: 'center',
                width: 50 + "px"
            },
            {
                field: 'name',
                title: '科室名'
            },
            // {
            //     field: 'description',
            //     title: '科室介绍'
            // },
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
}

function create() {
    var token = checktoken();
    $("#bOK1").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "department/create",
        data: {
            'token':token,
            'name':$("#name1").val(),
            'description':$("#description1").val()
        },
        success: function (data) {
            $("#bOK1").attr("disabled",false).text("提交");
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        科室添加成功,一秒后自动刷新本页面\n" +
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
        url: config.base_url + "department/update",
        data: {
            'token':token,
            'department_id':$('#d_id').val(),
            'name':$("#name2").val(),
            'description':$("#description2").val()
        },
        success: function (data) {
            $("#bOK2").attr("disabled",false).text("提交");
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        科室资料修改成功,一秒后自动刷新本页面\n" +
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
        $('#name2').val(row.name);
        $('#description2').val(row.description);
        $('#d_id').val(row.id);
    }
};



