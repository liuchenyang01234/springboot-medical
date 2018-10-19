var img = document.getElementById("imgRandom");
var rand = Math.ceil(Math.random()*10-5);

if (rand<=0) {
	rand=1;
}
var road = "/img/"+rand+".png";
window.onload = function(){
	img.src = road;
}



console.log(rand);