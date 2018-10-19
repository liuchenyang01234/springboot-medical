window.onload = init();

function init() {
    load_profiles();
    $('#caseTable').bootstrapTable({
        method:"GET",
        dataType:'json',
        pagination:true,
        search:true,
        //url:config.base_url + "medicalrecord?profile_id=" + p_id +"&token="+checktoken() + "&record_id=0",

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
                field: 'visit_time',
                title: '咨询日期'
            },
            {
                field: 'hospital',
                title: '咨询医生'
            },
            {
                field: 'description',
                title: '患者病情描述和医生建议'
            }
        ]
    });

}

function load_profiles() {
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
                var user = data.data;
                var htmlNodes = '';
                for(var i in user) {
                    htmlNodes += '<li class="profile_buttons" value="' + user[i].id + '"><a href="#recordlist"> ' + user[i].name + '</a></li>';
                    // htmlNodes += '<button class="btn btn-default eborder profile_buttons" value="' + user[i].id + '"> ' + user[i].name + ' </button>';
                }
                $('#blist').empty().append(htmlNodes);
                $(".profile_buttons").on("click",function () {
                    $("#current_name").text($(this).text());
                    if (document.getElementById("caseTable") == null){
                        $("#list-info").empty().append('<table id="caseTable"></table>');
                        init();
                    }
                    $('#caseTable').bootstrapTable('refresh',{url:config.base_url + "medicalrecord/order?profile_id=" + $(this).val() +"&token="+checktoken() + "&record_id=0"});
                });
            }
            else {
                alert_error(data.error);
            }

        }

    });
}

