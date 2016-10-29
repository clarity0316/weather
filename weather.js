window.onload=function  () {
	getBg();
}

function getBg(){
	var body = document.getElementsByTagName('body')[0];
	var bodyHeight = $(window).height();
	body.style.height = bodyHeight + 'px';
}
function setCookie(){
    var cityName = document.getElementById('inputCity').value;
	document.cookie = "cityName=" + cityName;
	window.location.href = "weather_2.html";
}