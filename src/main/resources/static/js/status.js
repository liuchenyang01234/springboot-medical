var phone = document.getElementById("phoneInput");
var phoneCheck = document.getElementById("phoneCheck");
var phoneCheck1 = document.getElementById("phoneCheck1");

var verify = document.getElementById("verifyInput");
var info = document.getElementById("infoInput");
var psd = document.getElementById("psdInput");
var reg = document.getElementById("reg");

function checkPhone(str){
	var phone = document.getElementById("phone");
//	alert(phone.value.length);
// 	var len = phone.value.length;
	if (!isPoneAvailable(str)) {
		console.log("手机格式错误");
        $("#errPhone").css("display","block");
		$("#phone").remove("okImg");
		$("#phone").addClass("errImg");
	} else{
        console.log("手机格式OK");
        $("#errPhone").css("display","none");
		$("#phone").remove("errImg");
		$("#phone").addClass("okImg");
	}
}

function checkUserName(str) {

	if (isUserName(str)){
        $("#errUser").css("display","none");
    }else{
		$("#errUser").css("display","block");
	}
}

function checkpassword(str) {

    if (password(str)){
        $("#errPwd").css("display","none");
    }else{
        $("#errPwd").css("display","block");
    }
}


