

navigator.geolocation.getCurrentPosition(function (position){
	var Longitude = position.coords.longitude;
	var Latitude = position.coords.latitude;
	$.ajax({

		url : 'https://fcc-weather-api.glitch.me/api/current?lon='+Longitude+'&lat='+Latitude,
		type : 'GET',
		dataType:'json',
		success : function(data) {     
			console.log(data);
			afficheUI(data);
		},	
		error : function()
		{
			$('#demo').text("Geolocation is not supported by this browser.")  ;
		}
	})});



function afficheUI(data){
	var town = data.name;
	var country = data.sys.country;
	var currentTempCelsius = Math.round(data.main.temp );
	var weatherDescription = data.weather[0].main;
	var weather = data.weather[0].description;
	
	$('#town').text(town+" , "+country);
	$('#temp').text(currentTempCelsius);
	$("#tempunit").text(" °C");
	$('#weatherDescription').text(weather);
	

	/* IMAGES */
	if (weatherDescription == "Clouds"){
		$('#weatherImg').append('<div><img src="IMG/307.gif"></div>');
		
	}
	else if (weatherDescription == "Clear"){
		$('#weatherImg').append('<div><img src="IMG/314.gif"></div>');
	}
	else if (weatherDescription == "Rain"){
		$('#weatherImg').append('<div><img src="IMG/311.gif"></div>');
	}
	else if (weatherDescription == "Thunderstorm"){
		$('#weatherImg').append('<div><img src="IMG/310.gif"></div>');
	}


/* Celcius-Fahrenheit */
	$("#tempunit").click(function() {

		var temperature = $("#tempunit").text();

		if (temperature == " °C") {
			console.log("second click");
			var farenheit = Math.floor(currentTempCelsius*9/5 + 32);
			$("#temp").html(farenheit);
			$("#tempunit").text(" °F");
		}
		else {
			console.log("first click");
			$("#temp").html(currentTempCelsius);
			$("#tempunit").text(" °C");
		}
	});
};


/* Spinner*/
$(document).ready(function(){
	$(document).ajaxStart(function(){
		$("#wait").css("display", "block");
	});
	$(document).ajaxComplete(function(){
		$("#wait").css("display", "none");
	});

});





