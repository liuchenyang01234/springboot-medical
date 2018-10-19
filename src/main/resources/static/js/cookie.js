function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}
function loginhandele()
{
   //var token=getCookie("token");
   console.log("11  ");

  /* if(token==null)
       window.location.href= 'login';*/
   // window.header('token': token, 'type_id': type_id)
    //request.setHeader("token",token);

    //window.location.href='/patient/info';
    //window.location.href= '/patient/info';
    $.ajax({
        //Ajax调用处理

       // headers: {'token': token, 'type_id': type_id},
        url: config.base_url + "/patient/info",
        dataType:"html",
        success: function (data) {
            console.log(data);
        }


    })
}