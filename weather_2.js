window.onload=function  () {
	getBg();
}
function getBg(){
	var body = document.getElementsByTagName('body')[0];
	var bodyHeight = $(window).height();
	body.style.height = bodyHeight + 'px';
	getData();
}
function getCookie(cityName) {  
    var arr,reg=new RegExp("(^| )"+cityName+"=([^;]*)(;|$)");  
    if(arr=document.cookie.match(reg))  
        return unescape(arr[2]);   
    else   
        return null;   
}  
function getData(){
	var cityName= getCookie('cityName');
	$.ajax({
         dataType: "jsonp",   
         async: true, 
         data: { 
         	city : cityName,
         	appkey : "0e5d5e47e3e3f2ea"
         },   
         type: "GET",  
	     success: function(req) {
	        console.log(req);
	        setInformation(req);

	    },
	     url: "http://api.jisuapi.com/weather/query"
	});
}
function setInformation(req){
	var infor = {
		name : document.getElementById('name'),
		date : document.getElementById('date'),
		weather : document.getElementById('weather'),
		temp : document.getElementById('temp'),
		templh : document.getElementById('tempLH'),
		img : document.getElementById('img'),
		sp_week : document.getElementById('sp_Week'),
		hour_Six:document.getElementById('hour_Six'),
		hour_Wea:document.getElementById('hour_Wea'),
		hour_Temp:document.getElementById('hour_Temp'),
		today:document.getElementById('today'),
		day_Daily:document.getElementById('day_Daily'),
		day_Weather:document.getElementById('day_Weather'),
		day_Temp:document.getElementById('day_Temp'),
		wea_img:document.getElementById('wea_img'),
		pressure:document.getElementById('pressure'),
		humidity:document.getElementById('humidity'),
		wind:document.getElementById('wind'),
		quality:document.getElementById('quality')
	};
	infor.name.innerHTML=req.result.city;
	infor.weather.innerHTML=req.result.weather;
	infor.today.innerHTML=req.result.date;
	infor.temp.innerHTML=req.result.temp+"°";
	infor.templh.innerHTML=req.result.templow+"°˜"+req.result.temphigh+"°";
	infor.sp_week.innerHTML=req.result.week+" ";
	for (var i = 1; i < 7; i++) {
		infor.hour_Six.childNodes[i*2-1].innerHTML=req.result.hourly[i].time;
		infor.hour_Wea.childNodes[i*2-1].innerHTML=req.result.hourly[i].weather;
		infor.hour_Temp.childNodes[i*2-1].innerHTML=req.result.hourly[i].temp+"°";
	}
	for (var i = 1 ; i < 5 ; i++){
		infor.day_Daily.childNodes[i*2-1].innerHTML=req.result.daily[i].week;
		infor.day_Weather.childNodes[i*2-1].innerHTML=req.result.daily[i].day.weather;
		infor.day_Temp.childNodes[i*2-1].innerHTML=req.result.daily[i].night.templow+"°˜"+req.result.daily[i].day.temphigh+"°";
	}
	var c=req.result.img;
	infor.wea_img.src="images/"+c+".png";
	infor.pressure.innerHTML=req.result.pressure+"Pa";
	infor.humidity.innerHTML=req.result.humidity+"RH%";
	infor.wind.innerHTML=req.result.winddirect+req.result.windpower;
	infor.quality.innerHTML=req.result.index[5].index;
}
