window.onload = init_order_table();

function init_orderlist(date) {
    $.ajax({
        type: "GET",
        url: config.base_url + "Doctororders",
        data:{
            'date':date,
            'token':checktoken(),
            'flag': 0
        },
        success: function (data) {
            if (data.succ == 1){
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].sex === 0) {
                        data.data[i].sex = "女";
                    } else {
                        data.data[i].sex = "男";
                    }
                }
                $('#order').bootstrapTable('load',data.data);
                $(".fixed-table-loading")[0].style.display="none";      //数据加载成功  加载那行字去掉
            }
        }
    });
}

function init_order_table(data) {

    $('#order').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,
        data:data,

        //url:config.base_url + "order?profile_id=2&token="+getCookie('token'),

        onLoadSuccess: function(){  //加载成功时执行

            return "加载成功";
        },
        onLoadError: function(){  //加载失败时执行
            return "加载数据失败";
        },
        striped:true,
        responseHandler:function (res) {    //data prehandle


        },
        onClickRow:function (row) {
            // var url = "orderdetail.html?oid="+row.id;
            // window.location.href = url;
            // // oid = row.id;
            // console.log(row.id);

        },
        // ss:function (){
        //     url = "www,baidu.com";
        //     //url = "dorderdetail.html?oid="+oid+"&age="+age;//此处拼接内容
        //     window.location.href = url;
        // },
        columns: [
            {
                field: 'id',
                title: '编号',
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
                        '<button id="showinfo" type="button" class="btn btn-default" >查看</button>'
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
