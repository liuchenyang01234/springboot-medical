window.onload = init();

function init() {
    load_log();
    init_log(1);
}

function init_log(status) {
    $.ajax({
        type: "GET",
        url: config.base_url + "Login/log",
        data:{
            'token':checktoken(),
            'status': status
        },
        success: function (data) {
            if (data.succ == 1){
                $('#login-s1').bootstrapTable('load',data.data);

            }
        }
    });
}


function load_log() {

    $('#login-s1').bootstrapTable({

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
                field: 'id',
                title: '编号',
                align: 'center',
                width: 50 + "px"
            },
            {
                field: 'ip',
                title: '登录ip'
            },
            {
                field: 'time',
                title: '登录时间'
            }
        ]
    });
}

// function load_() {
//
// }
// $('#login-s1').bootstrapTable({
//
//     method:"GET",
//     dataType:'json',
//     pagination:true,
//
//     url:config.base_url + "Login/log?status=1&token="+getCookie('token'),
//
//     onLoadSuccess: function(){  //加载成功时执行
//         return "加载成功";
//     },
//     onLoadError: function(){  //加载失败时执行
//         return "加载数据失败";
//     },
//     striped:true,
//
//     onClickRow:function (row) {
//
//     },
//     columns: [
//         {
//             field: 'id',
//             title: '编号',
//             align: 'center',
//             width: 50 + "px"
//         },
//         {
//             field: 'ip',
//             title: '登录ip'
//         },
//         {
//             field: 'time',
//             title: '登录时间'
//         }
//     ]
// });
