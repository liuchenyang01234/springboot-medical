window.onload = function () {
    inithead();
    load_doctor(getQueryString('doc_id'));
    init_evaluation();
};
function init_evaluation() {
    $.ajax({
        type: "POST",
        url: config.base_url + "evaluation?did=" + getQueryString('doc_id') +"&oid=0",
        success: function (data) {
            if (data.succ == 1){
                new Vue({
                    el: '#eval-list',
                    data: {
                        items: data.data
                    }
                })

            }
            else {
                alert_error(data.error);
            }
        }
    });


}
function load_doctor(d_id) {
    $.ajax({
        type: "GET",
        url: config.base_url + "doctorprofile/weekduty",
        data:{
            'doctor_id':d_id
        },
        success: function (data) {
            var description = $('#doctor_description').html();
            description = description.replace('{img}',config.img_url + data.data.photo)
                .replace('{department}',data.data.department)
                .replace('{doctor_name}',data.data.name)
                .replace('{doctor_type}',data.data.typename)
                .replace('{price}',data.data.price);
            $("#doctor-intro").text(data.data.introduction);
            $("#doctor-head").text("医生主页-" + data.data.name);
            $("#description").append(description);

            inittable(data.data);
        }
    });
}

//初始化表头
function inithead() {

    var htmls = '<span></span>';

    var formatDate = function(date){
        var month = (date.getMonth()+1);
        var day = date.getDate();
        var week = ['周日','周一','周二','周三','周四','周五','周六'][date.getDay()];

        return week + '#' + month + '-' + day;
    };

    var addDate= function(date,n){
        date.setDate(date.getDate()+n);
        return date;
    };

    var date = new Date();

    for(var i = 1;i <= 7;i++){
        var d_w = formatDate(addDate(date,1)).split("#");
        htmls += '<span class="typo_smaller typo_black">' + d_w[0] + '<br ><font class="typo_xsmall typo_gray">' + d_w[1] +'</font></span>'
    }
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
    //未排班，无分割线
    var empty = '<span></span>\n';

    //已满
    var full = '<span><cite><i class="yueman">已满</i></cite></span>\n';

    var time_part = '';


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
    time_part = '<span style="line-height: 1.06667rem;">上午</span>';
    for(var i=1; i<=7; i++){
        weekday++;
        if (weekday > 7)
            weekday = weekday - 7;
        //无排班
        if (num0[weekday] === -1)
            time_part += empty;
        //已满
        else if (num0[weekday] === 0)
            time_part += full;
        //有剩余
        else
            time_part += '<td>' +
                '<span onclick="commit_order(' + data.id +',' + weekday + ',' + '0)">'+
                // '<a href="submit_order.html?did=' + data.id + '&day=' + weekday + '&flag=0' + '"></a>' +
                '<cite>'+
                '<i class="yuyue">点击<br>预约</i>\n' +
                '</cite></span>\n';
    }

    $('#t-am').html(time_part);


    //拼接下午排班
    time_part = '<span style="line-height: 1.06667rem;">下午</span>';
    weekday = new Date().getDay();
    for(var i=1; i<=7; i++){
        weekday++;
        if (weekday > 7)
            weekday = weekday - 7;
        //无排班
        if (num1[weekday] === -1)
            time_part += empty;
        //已满
        else if (num1[weekday] === 0)
            time_part += full;
        //有剩余
        else
            time_part += '<td>' +
                '<span onclick="commit_order(' + data.id +',' + weekday + ',' + '1)">'+
                '<cite>'+
                '<i class="yuyue">点击<br>预约</i>\n' +
                '</cite></span>\n';
    }
    $('#t-pm').html(time_part);

}

function commit_order(id,weekday,flag) {
    window.location.href='../order/submit.html?did=' + id + '&day=' + weekday + '&flag=' + flag;
}

function switch_page(clicked) {
    if(clicked.hasClass('cur'))
        return;
    else {
        $('#tab-bar').children().each(function() {
            if ($(this).hasClass('cur')) {
                $(this).removeClass('cur');
            }
        });
        clicked.addClass('cur');
        if(clicked[0].value === "page-intro"){
            $('#page-order').css("display","none");
            $('#page-eval').css("display","none");
            $('#page-intro').css("display","block");
        }
        else if (clicked[0].value === "page-order"){
            $('#page-intro').css("display","none");
            $('#page-eval').css("display","none");
            $('#page-order').css("display","block");
        }
        else if(clicked[0].value === "page-eval"){
            $('#page-order').css("display","none");
            $('#page-intro').css("display","none");
            $('#page-eval').css("display","block");
        }
        else
            return;
    }
}