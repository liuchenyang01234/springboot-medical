var page_flag = 0;
var department_id = 0;
window.onload = loadinfo();

function loadinfo() {
    load_department();
    inithead();
    load_doctor(0,1);
}

function load_department() {
    var htmls = "";
    $.ajax({
        type: "GET",
        url: config.base_url + "department",
        success: function (response) {
            var data = response.data;
            for(var i in data){
                htmls += '<span class="small department_item">\n' +
                    '<a class="department_item" href="javascript:switch_department('+ data[i].id +  ')" id="department' + data[i].id + '">' + data[i].name + '</a>\n' +
                    '</span>';
            }
            $("#departments").empty().append(htmls);
        }
    });
}

function load_doctor(d_id, page) {
    $.ajax({
        type: "GET",
        url: config.base_url + "doctorprofile/dutylist",
        data:{
            'department_id':d_id,
            'page':page
        },
        success: function (data) {
            var initbody = '<tr><td colspan="12" style="height: 39px;"></td></tr>';
            $("#tablebody").empty().append(initbody);
            for(var i in data.data) {
                inittable(data.data[i])
            }
            //首次加载，初始化分页
            if(page_flag == 0){
                page_flag = 1;
                $("#pagination3").pagination({
                    currentPage: 1,// 当前页数
                    totalPage: data.count,// 总页数
                    isShow: true,// 是否显示首尾页
                    count: 7,// 显示个数
                    homePageText: "首页",// 首页文本
                    endPageText: "尾页",// 尾页文本
                    prevPageText: "上一页",// 上一页文本
                    nextPageText: "下一页",// 下一页文本
                    callback: function(current) {
                        load_doctor(department_id,current);
                    }
                });
            }
            if(page == 1)
                $("#pagination3").pagination("setPage", 1,data.count);
        }
    });
}

function switch_department(id) {
    department_id = id;
    $(".department_item").css({"background":"white","color":"black"});
    var textid = '#department' + id;
    $(textid).css({"background":"#75b9e6","color":"#fff"});
    load_doctor(id,1);
}

//初始化表头
function inithead() {
    var table = $('#maintable');
    var htmls = '<tr class="right_nav" style="width: 1002px; position: absolute;">\n' +
        '                        <th width="23%" colspan="2"><i>专家</i></th>\n' +
        '                        <th width="22%"><i>介绍</i></th>\n' +
        '                        <th width="2%"><a class="turn_fl" href="javascript:void(0)"></a></th>';


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
        htmls += '<th width="7%"><p>' + d_w[0] + '<span>' + d_w[1] +'</span></p></th>'
    }
    htmls += '<th width="3%"><a class="an_fr" href="javascript:void(0);"></a></th></tr>';
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
    var empty0 = '<td width="7%" class="bor_botm" align="center"></td>\n';
    //未排班，有分割线
    var empty1 = '<td align="center"></td>\n';
    //已满
    var full0 = '<td width="7%" class="bor_botm" align="center"><span class="yuyue_yiman">已满</span></td>\n';
    var full1 = '<td align="center"><span class="yuyue_yiman">已满</span></td>\n';

    var time_part = '<td width="3%" class="bor_botm tab_data" align="center"><span>上<br>午</span></td>';

    //1.替换医生简介部分
    var doctor_part = $('#doctor_change').html();
    doctor_part = doctor_part.replace(new RegExp("{doctor_id}","gm"),data.id)
        .replace('{img}',config.img_url + data.photo)
        .replace('{name}',data.name)
        .replace(new RegExp("{type}","gm"),data.typename)
        .replace('{department}',data.department)
        .replace('{description}',data.introduction.substr(0,80) + "...");

    //2.拼接时间表
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
            time_part += empty0;
        //已满
        else if (num0[weekday] === 0)
            time_part += full0;
        //有剩余
        else
            time_part += '<td width="7%" class="bor_botm" align="center">\n' +
                '<span class="yuyue_time">\n' +
                '<a target="_blank" href="submit_order.html?did=' + data.id + '&day=' + weekday + '&flag=0' +
                '" title="门诊类型：' + data.typename + '\n' +
                '出诊时间：'+ getdate(weekday) + '上午\n' +
                '科室：' + data.typename + '\n' +
                '剩余：' + num0[weekday] + '\n' +
                '咨询费：' + data.price + '元">预约</a>\n' +
                '</span>\n' +
                '</td>';
    }
    time_part += '<td width="3%" class="bor_botm"></td></tr>'+
                '<tr><td align="center" class="tab_data"><span>下<br>午\n</span></td>\n';
    weekday = new Date().getDay();

    //拼接下午排班
    for(var i=1; i<=7; i++){
        weekday++;
        if (weekday > 7)
            weekday = weekday - 7;
        //无排班
        if (num1[weekday] === -1)
            time_part += empty1;
        //已满
        else if (num1[weekday] === 0)
            time_part += full1;
        //有剩余
        else
            time_part += '<td align="center">\n' +
                '<span class="yuyue_time">\n' +
                '<a target="_blank" href="submit_order.html?did=' + data.id + '&day=' + weekday + '&flag=1' +
                '" title="门诊类型：' + data.typename + '\n' +
                '出诊时间：'+ getdate(weekday) + '下午\n' +
                '科室：' + data.typename + '\n' +
                '剩余：' + num1[weekday] + '\n' +
                '咨询费：' + data.price + '元">预约</a>\n' +
                '</span>\n' +
                '</td>';
    }
    time_part += '</tr>';

    $('#tablebody').append(doctor_part + time_part);

}