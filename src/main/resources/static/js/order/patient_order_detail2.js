window.onload = function () {

    var oid = getQueryString('oid');
    var pid = getQueryString('pid');
    orderdetail(oid,pid);
    init();
};

function live_btn() {
    var url = config.patient_live_url + $('#live').attr("value");
    window.open(url);
}

function cancel_order() {
    bootbox.confirm({
        size: "small",
        message: "是否取消此订单？",
        callback: function(result){
            /* result is a boolean; true = OK, false = Cancel*/
            if(result == true){
                $.ajax({
                    type: "POST",
                    url: config.base_url + "order/cancel",
                    data: {
                        'token': checktoken(),
                        'profile_id':getQueryString('pid'),
                        'order_id': getQueryString('oid'),
                    },
                    success:function (res) {
                        if (res.succ === 1){
                            setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                                window.location.reload();//页面刷新
                            },1500);
                        }
                        else
                            bootbox.alert({
                                size: "small",
                                title: "取消订单",
                                message: res.error
                            });
                    }
                });
            }
        }
    })
}

function del_order() {
    bootbox.confirm({
        size: "small",
        message: "是否删除此订单？",
        callback: function(result){
            /* result is a boolean; true = OK, false = Cancel*/
            if(result == true){
                $.ajax({
                    type: "POST",
                    url: config.base_url + "order/delete",
                    data: {
                        'token': checktoken(),
                        'profile_id':getQueryString('pid'),
                        'order_id': getQueryString('oid')
                    },
                    success:function (res) {
                        if (res.succ === 1){
                            setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                                window.location.reload();//页面刷新
                            },1500);
                        }
                        else
                            bootbox.alert({
                                size: "small",
                                title: "删除订单",
                                message: res.error
                            });
                    }
                });
            }
        }
    })

}

function create_case() {
    bootbox.confirm({
        size: "small",
        message: "是否生成咨询记录？",
        callback: function(result){
            /* result is a boolean; true = OK, false = Cancel*/
            if(result == true){
                $.ajax({
                    type: "POST",
                    url: config.base_url + "order/createcase",
                    data: {
                        'token': checktoken(),
                        'profile_id':getQueryString('pid'),
                        'order_id': getQueryString('oid'),
                    },
                    success:function (res) {
                        if (res.succ === 1){
                            bootbox.alert({
                                size: "small",
                                title: "生成咨询记录",
                                message: "生成记录成功！"
                            });
                        }
                        else
                            bootbox.alert({
                                size: "small",
                                title: "生成咨询记录",
                                message: res.error
                            });
                    }
                });
            }
        }
    })

}
