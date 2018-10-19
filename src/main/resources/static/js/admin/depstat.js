window.onload = init_dep_table();

var ctx = document.getElementById("chart").getContext("2d");
var dep_month_data;
var color = [];

var randomScalingFactor_255 = function(){ return Math.round(Math.random()*255)};

function init_dep_table() {

    $('#stat_dep_table').bootstrapTable({

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
                field: 'department_id',
                title: '科室编号',
                sortable : true
            },
            {
                field: 'name',
                title: '科室'
            },
            {
                field: 'new_orders',
                title: '订单数量',
                sortable : true
            },
            {
                field: 'complete_orders',
                title: '完成订单数量',
                sortable : true
            },
            {
                field: 'report_orders',
                title: '投诉数量',
                sortable : true
            }
        ]
    });

    $.ajax({
        type: "POST",
        url: config.base_url + "stat/depmonth",
        data: {
            'token':checktoken(),
        },
        success: function (res) {
            if(res.succ == 1){
                var htmls = "";
                for (var i = 0; i < res.data.length; i++) {
                    htmls += "<option value=" + res.data[i].date + ">" + res.data[i].date + "</option>";
                }
                $("#month").empty().append(htmls);
            }

            else {
                //todo:error
            }
        }
    });

}

function init_dep_data() {
    $.ajax({
        type: "POST",
        url: config.base_url + "stat/dep",
        data: {
            'token':checktoken(),
            'date':$("#month").val()
        },
        success: function (res) {
            if(res.succ == 1){
                $('#stat_dep_table').bootstrapTable('load',res.data);
                dep_month_data = res.data;
                //随机生成颜色
                for (var i=0;i<res.data.length;i++){
                    var temp = "rgb(" + randomScalingFactor_255() + "," + randomScalingFactor_255() + "," + randomScalingFactor_255() + ")";
                    color.push(temp);
                }

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
    process_user_data(dep_month_data,flag);
}

function process_user_data(data,flag) {
    var date = [];
    var count = [];
    if (flag == 1){
        for (var i=0;i<data.length;i++){
            date.push(data[i].name);
            count.push(data[i].new_orders);
        }
        init_chart(date,count,ctx);
    }
    else if (flag == 2){
        for (var i=0;i<data.length;i++){
            date.push(data[i].name);
            count.push(data[i].complete_orders);
        }
        init_chart(date,count,ctx);
    }
    else if (flag == 3){
        for (var i=0;i<data.length;i++){
            date.push(data[i].name);
            count.push(data[i].report_orders);
        }
        init_chart(date,count,ctx);
    }

}

function init_chart(labels,data,ctx) {
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',
        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                backgroundColor:color,
                data: data
            }]
        },

        // 配置文件
        options: Chart.defaults.pie
    });
}

function clear_canvas() {
    $('#chart').remove();
    $('#container').append('<canvas id="chart"></canvas>');
    ctx = document.getElementById("chart").getContext("2d");
}