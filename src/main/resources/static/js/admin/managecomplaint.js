window.onload = init_table();

function init_list() {
    $.ajax({
        type: "GET",
        url: config.base_url + "evaluation/complaint",
        data:{
            'token':checktoken(),
            'name':$("#search_name").val()
        },
        success: function (data) {
            if (data.succ == 1){
                $('#complaint').bootstrapTable('load',data.data);
                $(".fixed-table-loading")[0].style.display="none";      //数据加载成功  加载那行字去掉
            }
        }
    });
}

function init_table() {

    $('#complaint').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,
        search: true,

        // url:config.base_url + "evaluation/complaint",

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
                field: 'patient',
                title: '患者'
            },
            {
                field: 'doctor',
                title: '医生'
            },
            {
                field: 'comment',
                title: '投诉内容'
            },
            {
                field: 'create_time',
                title: '投诉时间'
            },
            {
                title: '操作',
                align: "center",
                events: "operateEvents",
                formatter: function (value, row, index) {
                    return [
                        '<button id="edit" type="button" class="btn btn-default" data-toggle="modal" data-target="#info-modal">查看</button>'
                    ].join("");
                }
            }
        ]
    });

    $('#reply').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,
        search: true,
        pageSize:5,


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
                title: '回复者'
            },
            {
                field: 'reply',
                title: '回复内容'
            },
            {
                field: 'reply_time',
                title: '回复时间'
            }
        ]
    });

}


function reply() {
    var token = checktoken();
    $("#bOK").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "evaluation/admin_reply",
        data: {
            'token':token,
            'eid':$('#eid').text(),
            'reply':$("#text_reply").val()
        },
        success: function (data) {
            $("#bOK").attr("disabled",false).text("提交");
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        回复成功\n" +
                    "                    </div>";
                $("#alertmessage2").append(succ_message);
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
        $('#eid').text(row.id);
        $('#comment').text(row.comment);
        $('#order_info').attr("href","adminorder.html?oid=" + row.oid);

        $.ajax({
            type: "GET",
            url: config.base_url + "evaluation/admin_replylist",
            data:{
                'token':checktoken(),
                'eid':row.id
            },
            success: function (data) {
                if (data.succ == 1){
                    $('#reply').bootstrapTable('load',data.data);
                    $(".fixed-table-loading")[0].style.display="none";      //数据加载成功  加载那行字去掉
                }
            }
        });
    }
};



