function init_order_table(flag) {

    $('#order').bootstrapTable({

        pagination: true,

        search: true,

        url: config.base_url + "Doctororders?flag=" + flag + "&token=" + checktoken(),

        onLoadSuccess: function () {  //加载成功时执行
            console.log("Loading");
            return "加载成功";
        },
        onLoadError: function () {  //加载失败时执行
            return "加载数据失败";
        },
        striped: true,
        responseHandler: function (res) {    //data prehandle
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].sex === 0) {
                    res.data[i].sex = "女";
                } else {
                    res.data[i].sex = "男";
                }
            }
            console.log(res);
            return res;
        },
        onClickRow: function (row) {

        },
        columns: [
            {
                field: 'id',
                title: '订单编号',
                align: 'center',
                width: 50 + "px"
            },
            {
                field: 'name',
                title: '患者姓名'
            },
            {
                field: 'sex',
                title: '患者性别'
            },
            {
                field: 'birth',
                title: '患者生日'
            },
            {
                field: 'appointment_date',
                title: '预约时间'
            },
            {
                field: 'price',
                title: '价格'
            },
            {
                field: 'status',
                title: '状态'
            },
            {
                title: '操作',
                align: "center",
                events: "operateEvents",
                formatter: function (value, row, index) {
                    return [
                        '<button id="showinfo" type="button" class="btn btn-default">查看</button>'
                    ].join("");
                }
            }
        ]
    });
}

window.operateEvents = {
    'click #showinfo': function (e, value, row, index) {
        console.log(row);
        var url = "dorderdetail.html?oid="+row.id;
        window.open(url);
    }
};

function load() {

    $("#ok").attr("disabled",true);

    $.ajax({
        url:config.base_url + "Doctororders/queue?&token=" + checktoken(),
        success:function (res) {

            if (res.succ === 1){

                $("#patient").text(res.data.name);
                $("#contentCall").css("display","none");
                $("#link").css("display","block");
                var href = "dorderdetail.html?oid=" + res.data.id;
                $("#link").attr("href",href);

            }else {
                $("#contentCall").text("暂无待咨询的患者");
            }
        }
    });
    // var url = "dorderdetail.html?oid=30";
    // window.open(url);
}



