var did,flag,day;
var dropdown;
var schedule_id;
window.onunload = load_order();

function submit() {
    //获取病历ID
    var m_ids = [];
    try{
        var p_id = $('input[name="mem_list"]:checked')[0].getAttribute('value');
    }catch (e){
        $('#choose_member_info').css("display","block");
        return;
    }
    $('span.dropdown-selected').each(function () {
        var t = $(this).find("i").first()[0].getAttribute('data-id');
        m_ids.push(t);
    });
    if (typeof(schedule_id) == "undefined"){
        $('#select-time-close').css("display","block");
        return;
    }


    $("#submitbtn").attr("disabled",true);
    var disease_input = $("#disease_input").val();
    $.ajax({
        type: "POST",
        url: config.base_url + "order/create",
        data: {
            'token':checktoken(),
            'profile_id':p_id,
            'appointment_time':schedule_id,
            'record_id':m_ids,
            'disease_input': disease_input
        },
        success: function (data) {
            if (data.succ == 1){
                window.location.href = "yysuccess.html?isdetail=0&oid=" + data.data + "&pid=" + p_id;
            }
            else {
                alert_error(data.error);
            }
        }
    });
}



function load_order() {
    did = getQueryString('did');
    flag = getQueryString('flag');
    day = getQueryString('day');
    load_doctor();
    load_userprofile();
    dropdown = $('.dropdown-mul-1').dropdown({
        limitCount: 40,
        multipleMode: 'label'
    }).data('dropdown') ;
}

function load_doctor() {

    $.ajax({
        type: "GET",
        url: config.base_url + "doctorprofile/doctorduty",
        data:{
            'doctor_id':did,
            'flag':flag,
            'day':day
        },
        success: function (data) {
            init_doctor(data);
        }
    });
}

function load_userprofile() {
    $.ajax({
        url: config.base_url + "userprofile",
        type: 'get',
        dataType: 'json',
        data: {
            profile_id: 0,
            token:checktoken()
        },
        success: function (data) {
            if(data.succ == 1){
                init_memlist(data.data);
            }
            else {
                alert_error(data.error);
            }
        }
    });
}

function load_case() {
    var value = $('input[name="mem_list"]:checked').val();
    var dropdown_data = [];
    $.ajax({
        url:config.base_url + "medicalrecord/all",
        type: 'get',
        dataType: 'json',
        data: {
            profile_id: value,
            token:checktoken(),
            record_id:0
        },
        success: function (data) {
            //dropdown.update(data,true);
            if (data.succ == 1){
                for (var i in data.data){
                    var option = new Object();
                    option.id = data.data[i].id;
                    option.name = '就诊时间:' + data.data[i].visit_time + '  就诊医院:' + data.data[i].hospital;
                    dropdown_data[i] = option;
                }
            }
            else{
                var option = new Object();
                option.id = 0;
                option.disabled = true;
                option.name = data.error;
                dropdown_data[0] = option;
            }
            dropdown_data = JSON.stringify(dropdown_data);
            dropdown.update(JSON.parse(dropdown_data),true);
        }
    });
}

function init_doctor(data) {

    var week = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
    var time_range = '<li value="{id}" class="">{range}</li>';

    var s_flag = (flag == 0)?'上午':'下午';

    //1.替换医生资料模板
    var doctor_info_part = $('#doctor_info_change').html();
    doctor_info_part = doctor_info_part.replace(new RegExp("{department}","gm"),data.department)
        .replace('{img}',config.img_url + data.photo)
        .replace('{doctor_id}',data.id)
        .replace('{name}',data.name)
        .replace(new RegExp("{type}","gm"),data.typename)
        .replace('{price}',data.price);
    $("#doctor_info").append(doctor_info_part);

    //2.拼接就诊时间
    var time_part = $('#time_change').html();
    time_part = time_part.replace('{date}',getdate(day) + '    ' + s_flag)
        .replace('{week}',week[day-1]);
    $("#yuyue-time").append(time_part);

    time_part = '';
    for (var i in data.time_list){
        time_part += time_range.replace('{id}',data.time_list[i].id).replace('{range}',data.time_list[i].range);
    }
    $("#delts").append(time_part);

    $('#delts').children().click(function () {
        click_time($(this));
    })

}

//时间按钮点击事件
function click_time(clicked) {

    if(clicked.hasClass('cur'))
        return;
    else {
        $('#delts').children().each(function() {
            if ($(this).hasClass('cur')) {
                $(this).removeClass('cur');
            }
        });
        clicked.addClass('cur');
        schedule_id = clicked.val();
    }
}

//替换患者列表模板
function init_memlist(data) {
    var htmls = '';
    for (var i in data){
        var sex = (data[i].sex == 0)?'女':'男';
        var mem_part = $('#mem_change').html();
        mem_part = mem_part.replace('{user_id}',data[i].id)
            .replace('{name}',data[i].name)
            .replace('{sex}',sex)
            .replace('{birth}',data[i].birth)
            .replace('{address}',data[i].address)
            .replace('{phone}',data[i].phone);
        htmls += mem_part + '\n';
    }
    $("#mem_list").append(htmls);
    //点击加载对应病历
    $(':radio').click(function () {
        load_case();
    });
}
