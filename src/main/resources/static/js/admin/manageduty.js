window.onload = init();
var doctor_id;

function init() {
    init_doctor_table();
    inithead();
    init_duty_table();
}
function load_doctor(d_id) {
    $.ajax({
        type: "GET",
        url: config.base_url + "doctorprofile/weekduty",
        data:{
            'doctor_id':d_id
        },
        success: function (data) {
            inittable(data.data);
        }
    });
}

function load_time_range(flag) {
    var text = flag == 0?"(上午)":"(下午)";
    $.ajax({
        type: "POST",
        url: config.base_url + "timerange",

        success: function (data) {
            if(data.succ == 1){
                var data = data.data;
                var htmls = "";
                for(var i in data){
                    if (data[i].flag == flag)
                        htmls += "<option value=" + data[i].id + ">" + data[i].range + text + "</option>";
                }
                $("#range").empty().append(htmls);
            }
            else {
                alert_error(data.error);
            }
        }
    });
}

function add_duty() {
    $("#bOK2").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "doctorprofile/addduty",
        data:{
            'token':checktoken(),
            'doctor_id':doctor_id,
            'day':$("#weekday").val(),
            'range':$("#range").val(),
            'max_count':$("#max_count1").val()
        },

        success: function (data) {
            $("#bOK2").attr("disabled",false).text("提交");
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        排班添加成功\n" +
                    "                    </div>";
                $("#alertmessage2").append(succ_message);
                //页面需要刷新
                // location.reload();
                // setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                //     window.location.reload();//页面刷新
                // },1500);
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

function edit_duty() {
    $("#bOK3").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "doctorprofile/editduty",
        data:{
            'token':checktoken(),
            'sid':$("#s_id").val(),
            'status':$("#status").val(),
            'max_count':$("#max_count2").val()
        },

        success: function (data) {
            $("#bOK3").attr("disabled",false).text("提交");
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        排班修改成功\n" +
                    "                    </div>";
                $("#alertmessage3").append(succ_message);
                //页面需要刷新
                // location.reload();
                // setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                //     window.location.reload();//页面刷新
                // },1500);
            }

            else {
                var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    data.error + "</div>";
                $("#alertmessage3").append(error_message);
            }
        }
    });
}

function init_duty_table() {
    $('#duty').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,

        // url:config.base_url + "Doctorprofile/dayduty?doctor_id=" + did + "&day=" + day + "&flag=" + flag,

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
                title: '排班编号',
                align: 'center',
                width: 50 + "px"
            },
            {
                field: 'text_day',
                title: '星期'
            },
            {
                field: 'range',
                title: '时间段'
            },
            {
                field: 'max_count',
                title: '最大接诊数量'
            },
            {
                field: 'text_status',
                title: '状态'
            },
            {
                title: '操作',
                align: "center",
                events: "operateEvents",
                formatter: function (value, row, index) {
                    return [
                        '<button id="edit-duty" type="button" class="btn btn-default" data-toggle="modal" data-target="#edit-duty-modal">编辑</button>'
                    ].join("");
                }
            }
        ]
    });

}

//加载排班列表
function load_duty(day,flag,did) {
    load_time_range(flag);

    var weekdays = ['','星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
    var status = ['无效','有效'];
    $("#doctor_id1").val(doctor_id);
    $("#doctor_id2").val(doctor_id);
    $("#doctor_id3").val(doctor_id);
    $("#weekday").val(day);

    $.ajax({
        type: "GET",
        url: config.base_url + "Doctorprofile/dayduty?doctor_id=" + did + "&day=" + day + "&flag=" + flag,
        success: function (data) {
            if (data.succ == 1){
                for (var i = 0; i < data.data.length; i++) {
                    data.data[i].text_day = weekdays[data.data[i].day];
                    data.data[i].text_status = status[data.data[i].status];
                }
                $('#duty').bootstrapTable('load',data.data);
            }
        }
    });
}

//初始化表头
function inithead() {
    var table = $('#maintable');

    var htmls = '<tr> <th width="8%"  style="text-align: center"><a class="page_fl" href="javascript:void(0);"></a></th>';

    var formatDate = function(date){
        var month = (date.getMonth()+1);
        var day = date.getDate();
        var week = ['周日','周一','周二','周三','周四','周五','周六'][date.getDay()];

        return month + '-' + day + '#' + week;
    };

    var addDate= function(date,n){
        date.setDate(date.getDate()+n);
        return date;
    };

    var date = new Date();

    for(var i = 1;i <= 7;i++){
        var d_w = formatDate(addDate(date,1)).split("#");
        htmls += '<th style="text-align: center"><b>' + '</b><em>' + d_w[1] +'</em></th>'
    }
    htmls += '<th width="8%" style="text-align: center"><a class="page_fr" href="javascript:void(0);"></a></th></tr>';
    $("#thead").html(htmls);
}



//构造表主体结构
function inittable(data) {

    var htmls = '';

    //剩余人数
    var num0 = [-1,-1,-1,-1,-1,-1,-1,-1];//上午
    var num1 = [-1,-1,-1,-1,-1,-1,-1,-1];//下午

    //获取周次
    var weekday = new Date().getDay();

    //常用组件
    //未排班
    var empty = '<td><span class="doc_duty_empty"><a style="cursor:pointer;" onclick="load_duty({day},{flag},{did})" data-toggle="modal" data-target="#duty-list-modal">添加排班</a></span></td>\n';

    //已有排班
    var full = '<td><span class="doc_yuyue_time"><a style="cursor:pointer;" onclick="load_duty({day},{flag},{did})" data-toggle="modal" data-target="#duty-list-modal">编辑排班</a></span></td>\n';

    var time_part = '<tr></tr><td class="tomr"><span>上午</span></td>';


    //拼接时间表
    //解析剩余号数
    var timelist = data.time_list;
    if (timelist !== null){
        for(var i in timelist) {
            var day = timelist[i].day;
            //上午
            if (timelist[i].flag === 0){
                if(num0[day] === -1)
                    num0[day] = 0;
                num0[day] += timelist[i].number;
            }
            //下午
            else {
                if(num1[day] === -1)
                    num1[day] = 0;
                num1[day] += timelist[i].number;
            }
        }
    }

    //拼接上午排班
    for(var i=1; i<=7; i++){
        weekday++;
        if (weekday > 7)
            weekday = weekday - 7;
        //无排班
        if (num0[weekday] === -1)
            time_part += empty.replace('{day}',weekday).replace('{flag}',0).replace('{did}',doctor_id);
        //有排班
        else
            time_part += full.replace('{day}',weekday).replace('{flag}',0).replace('{did}',doctor_id);
    }
    time_part += '<td class="nbor"></td></tr>'+
        '<tr><td class="tomr"><span>下午</span></td>\n';
    weekday = new Date().getDay();

    //拼接下午排班
    for(var i=1; i<=7; i++){
        weekday++;
        if (weekday > 7)
            weekday = weekday - 7;
        //无排班
        if (num1[weekday] === -1)
            time_part += empty.replace('{day}',weekday).replace('{flag}',1).replace('{did}',doctor_id);
        //有排班
        else
            time_part += full.replace('{day}',weekday).replace('{flag}',1).replace('{did}',doctor_id);
    }
    time_part += '<td class="nbor"></td></tr>';

    $('#tbody').html(time_part);
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
                for (var i = 0; i < data.data.length; i++) {
                    data.data[i].introduction = data.data[i].introduction.substr(0,90);
                }
                $('#doctors').bootstrapTable('load',data.data);
                $(".fixed-table-loading")[0].style.display="none";      //数据加载成功  加载那行字去掉
            }
        }
    });
}

function init_doctor_table(data) {

    $('#doctors').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,
        pageSize:3,
        data:data,

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
            {
                field: 'introduction',
                title: '医生简介'
            },
            {
                title: '操作',
                align: "center",
                events: "operateEvents",
                formatter: function (value, row, index) {
                    return [
                        '<button id="edit" type="button" class="btn btn-default">排班</button>'
                    ].join("");
                }
            }
        ]
    });
}

window.operateEvents = {
    'click #edit': function (e, value, row, index) {
        load_doctor(row.id);
        doctor_id = row.id;
    },
    'click #edit-duty': function (e, value, row, index) {
        $("#s_id").val(row.id);
        $("#status").val(row.status);
        $("#max_count2").val(row.max_count);
    }
};