$('#caseTable').bootstrapTable({

    method:"GET",
    dataType:'json',
    pagination:true,
    search:true,

    url:config.base_url + "userprofile?profile_id=0&token="+getCookie('token'),

    onLoadSuccess: function(){  //加载成功时执行
        return "加载成功";
    },
    onLoadError: function(){  //加载失败时执行
        return "加载数据失败";
    },
    striped:true,
    responseHandler:function (res) {    //data prehandle
        for (var i=0;i<res.data.length;i++){
            if (res.data[i].sex === 0){
                res.data[i].sex="女";
            }else{
                res.data[i].sex="男";
            }
        }
        return res;
    },
    onClickRow:function (row) {
        $('#pname1').val(row.name);
        $('#birthday1').val(row.birth);
        $('#phone1').val(row.phone);
        if (row.sex === "男") {
            document.getElementById("man").checked= true;
        }else {
            document.getElementById("woman").checked= true;
        }
        //console.log(row.id);
        document.getElementById("getID").innerText=row.id;
        //$('#getID').val(row.id);
    },
    columns: [
        {
            field: 'id',
            title: '序号',
            align:'center',
            width: 50 + "px"
        },
        {
            field: 'name',
            title: '姓名'
        },
        {
            field: 'sex',
            title: '性别'
        },
        {
            field: 'birth',
            title: '生日'
        },
        {
            field: 'address',
            title: '地址'
        },
        {
            field: 'phone',
            title: '手机号'
        },
        {
            tittle:'操作',
            align:"center",
            formatter: function (value, row, index) {
                //value = "编辑";
                //console.log(row.id);
                return "<div class=\"glyphicon glyphicon-edit\"  data-target=\"#editCase\" data-toggle=\"modal\" data-type=\"text\" data-pk=\""+row.Id+"\" data-title=\"用户名\" data-id='' style=\"cursor:pointer\"></div>";
            }
        }
    ]
});

function update(row) {

    console.log(gloable);
    alert(gloable);
    //return 'index';
}