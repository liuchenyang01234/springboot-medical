window.onload = init_doctor_table();

var ctx = document.getElementById("chart").getContext("2d");
var doctor_month_data;

function init_doctor_table() {

    $('#stat_rank_table').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,
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
                field: 'doctor_id',
                title: '医生编号'
            },
            {
                field: 'name',
                title: '医生姓名'
            },
            {
                field: 'new_orders',
                title: '订单数量'
            },
            {
                field: 'complete_orders',
                title: '完成订单数量'
            },
            {
                field: 'report_orders',
                title: '投诉数量'
            },
            {
                field: 'score',
                title: '评价'
            }
        ]
    });
    $('#stat_doctor_table').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,
        pageSize:5,

        //url:config.base_url + "order?profile_id=2&token="+getCookie('token'),

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
                title: '医生编号',
                align: 'center',
                width: 50 + "px"
            },
            {
                field: 'name',
                title: '医生姓名'
            },
            {
                field: 'department',
                title: '科室'
            },
            {
                field: 'typename',
                title: '医生类型'
            },
            // {
            //     field: 'introduction',
            //     title: '医生简介'
            // },
            {
                title: '操作',
                align: "center",
                events: "operateEvents",
                formatter: function (value, row, index) {
                    return [
                        '<div id="edit" class="glyphicon glyphicon-edit" onclick="init_month_data('+ row.id +')" style="cursor:pointer"></div>'
                    ].join("");
                }
            }
        ]
    });
    $('#stat_month_table').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,
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
                field: 'date',
                title: '月份',
                sortable : true
            },
            {
                field: 'doctor_id',
                title: '医生编号'
            },
            {
                field: 'new_orders',
                title: '订单数量'
            },
            {
                field: 'complete_orders',
                title: '完成订单数量'
            },
            {
                field: 'report_orders',
                title: '投诉数量'
            },
            {
                field: 'score',
                title: '评价'
            }
        ]
    });


}

function init_doctor_rank() {
    $.ajax({
        type: "POST",
        url: config.base_url + "stat/doctor",
        data: {
            'token':checktoken(),
            'did':0,
            'type':$("#type").val()
        },
        success: function (res) {
            if(res.succ == 1){
                $('#stat_rank_table').bootstrapTable('load',res.data);
            }

            else {
                //todo:error
            }
        }
    });
}

function init_doctor_list() {
    $.ajax({
        type: "GET",
        url: config.base_url + "Doctorprofile/name",
        data:{
            'name':$("#search_name").val()
        },
        success: function (data) {
            if (data.succ == 1){
                // for (var i = 0; i < data.data.length; i++) {
                //     data.data[i].introduction = data.data[i].introduction.substr(0,30);
                // }
                $('#stat_doctor_table').bootstrapTable('load',data.data);
                // $(".fixed-table-loading")[0].style.display="none";      //数据加载成功  加载那行字去掉
            }
        }
    });
}

function init_month_data(did) {
    $.ajax({
        type: "POST",
        url: config.base_url + "stat/doctor",
        data: {
            'token':checktoken(),
            'did':did
        },
        success: function (res) {
            if(res.succ == 1){
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].date = res.data[i].date.substr(0,7);
                }
                $('#stat_month_table').bootstrapTable('load',res.data);
                doctor_month_data = res.data;
                clear_canvas();
                process_user_data(res.data,1);
            }

            else {
                //todo:error
            }
        }
    });

}

function switch_data(flag) {
    clear_canvas();
    process_user_data(doctor_month_data,flag);
}

function process_user_data(data,flag) {
    var date = [];
    var count = [];
    if (flag == 1){
        for (var i=0;i<data.length;i++){
            date.push(data[i].date);
            count.push(data[i].new_orders);
        }
        init_chart(date,count,ctx,'rgb(151, 217, 234)');
    }
    else if (flag == 2){
        for (var i=0;i<data.length;i++){
            date.push(data[i].date);
            count.push(data[i].complete_orders);
        }
        init_chart(date,count,ctx,'rgb(244, 177, 98)');
    }
    else if (flag == 3){
        for (var i=0;i<data.length;i++){
            date.push(data[i].date);
            count.push(data[i].report_orders);
        }
        init_chart(date,count,ctx,'rgb(246, 132, 132)');
    }
    else if (flag == 4){
        for (var i=0;i<data.length;i++){
            date.push(data[i].date);
            count.push(data[i].score);
        }
        init_chart(date,count,ctx,'rgb(133, 211, 152)');
    }

}

function init_chart(labels,data,ctx,color) {
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: 'rgb(255, 255, 255)',//绘制双曲线的时候最好使用rgba,要不不透明的白色背景可以使得某些线条绘制不出来
                // borderColor: 'rgb(153, 217, 234)',
                borderColor: color,
                data: data
            }]
        },
        // 配置文件
        options: {
            //标题设置
            title:{
                display:true,
                text:'',
            },
            //禁用动画
            animation:{
                duration:0,
            },
            hover:{
                animationDuration:0,
            },
            // responsive: false,
            responsiveAnimationDuration: 0,
            //提示功能
            tooltips:{
                enable:false
            },
            //顶部的文字提示
            legend:{
                display:false,
            },
            //设置x,y轴网格线显示,标题等
            scales :{
                xAxes:[{
                    //轴标题
                    scaleLabel:{
                        display:true,
                        labelString:'月份',
                        fontColor:'#666'
                    },
                    //网格显示
                    gridLines:{
                        display:false
                    }


                }],
                yAxes:[{
                    scaleLabel:{
                        display:true,
                        labelString:'数值'
                    },
                    gridLines:{
                        display:false
                    },

                }],

            },

            //禁用赛尔曲线
            elements: {
                line: {
                    tension: 0,
                }
            }

        }
    });
}

function clear_canvas() {
    $('#chart').remove();
    $('#container').append('<canvas id="chart"></canvas>');
    ctx = document.getElementById("chart").getContext("2d");
}