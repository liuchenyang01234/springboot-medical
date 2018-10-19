
var wait=60;
function time(o){
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.innerHTML="点击获取";
        wait = 60;
    } else {
        o.setAttribute("disabled", true);
        o.innerHTML="重新发送(" + wait + ")";
        wait--;
        setTimeout(function() {
                time(o)
            },
            1000)
    }
}
// document.getElementById("getInfoCode").onclick=function(){time(this);}