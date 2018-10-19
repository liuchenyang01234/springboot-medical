window.onload = function () {
    inithead();
    load_doctor(getQueryString('doctor_id'));
    init_evaluation();
};
function init_evaluation() {
    $('#evaluation').bootstrapTable({
        method:"GET",
        dataType:'json',
        pagination:true,
        url:config.base_url + "evaluation?did=" + getQueryString('doctor_id') +"&oid=0",

        onLoadSuccess: function(){  //加载成功时执行
            return "加载成功";
        },
        onLoadError: function(){  //加载失败时执行
            return "加载数据失败";
        },
        striped:true,

        onClickRow:function (row) {
            // alert(row.profile_id)
        },
        columns: [
            {
                field: 'id',
                title: '序号',
                align:'center',
                width: 50 + "px"
            },
            {
                field: 'create_time',
                title: '评价日期'
            },
            {
                field: 'score',
                title: '评价得分'
            },
            {
                field: 'comment',
                title: '评价内容'
            }
        ]
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
                .replace('{description}',data.data.introduction);
            $("#description").append(description);

            inittable(data.data);
        }
    });
}

//初始化表头
function inithead() {
    var table = $('#maintable');

    var htmls = '<tr> <th width="8%"><a class="page_fl" href="javascript:void(0);"></a></th>';

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
        htmls += '<th><b>' + d_w[0] + '</b><em>' + d_w[1] +'</em></th>'
    }
    htmls += '<th width="8%"><a class="page_fr" href="javascript:void(0);"></a></th></tr>';
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
    var empty = '<td></td>\n';

    //已满
    var full = '<td><span class="doc_yiman">已满</span></td>\n';

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
            time_part += empty;
        //已满
        else if (num0[weekday] === 0)
            time_part += full;
        //有剩余
        else
            time_part += '<td>' +
                '<span class="doc_yuyue_time"> '+
                '<a target="_blank" href="submit_order.html?did=' + data.id + '&day=' + weekday + '&flag=0' +
                '" title="门诊类型：' + data.typename + '\n' +
                '出诊时间：'+ getdate(weekday) + '上午\n' +
                '科室：' + data.typename + '\n' +
                '剩余：' + num0[weekday] + '\n' +
                '咨询费：' + data.price + '元">预约</a>\n' +
                '</span>\n' +
                '</td>';
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
            time_part += empty;
        //已满
        else if (num1[weekday] === 0)
            time_part += full;
        //有剩余
        else
            time_part += '<td>' +
                '<span class="doc_yuyue_time"> '+
                '<a target="_blank" href="submit_order.html?did=' + data.id + '&day=' + weekday + '&flag=0' +
                '" title="门诊类型：' + data.typename + '\n' +
                '出诊时间：'+ getdate(weekday) + '上午\n' +
                '科室：' + data.typename + '\n' +
                '剩余：' + num0[weekday] + '\n' +
                '咨询费：' + data.price + '元">预约</a>\n' +
                '</span>\n' +
                '</td>';
    }
    time_part += '<td class="nbor"></td></tr>';

    $('#tbody').html(time_part);
}