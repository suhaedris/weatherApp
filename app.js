
function getWeather(){
    const apiKey ="624e8a4acecd2e9b879f5cc4c8451956";
    const city = document.getElementById("cityInput").value;
    if(!city){
        alert("Please enter a city");
        return;
    }
    const currentWeatherurl = "https://api.openweathermap.org/data/2.5/weather?q="+ city+ "&appid="+ apiKey+"&units=metric";
    const Geonames = "http://api.geonames.org/searchJSON?q="+city +"&maxRows=5&username=suha.edris";
    fetch(currentWeatherurl)
    .then(response => response.json())
    .then(data => {
        displayweather(data);
    })
    .catch(error => {
        console.error('error fetching current weather data:', error);
        alert("Error fetching current weather data. Please try again");
    });
}   
function displayweather(data){
    const tempDivInfo= document.getElementById('temp-div');
    const weatherInfoDiv=document.getElementById('weather-info');
    const weatherIcon=document.getElementById('weather-icon');
    const hourlyForcastDiv=document.getElementById('hourly-forcast'); 
    if(data.cod=='404'){
        weatherInfoDiv.innerHTML="<p> "+data.message+ "</p>";
    }
    else{
        const cityName=data.name;
        const temprature=data.main.temp;
        const description=data.weather[0].description;
        const iconcode=data.weather[0].icon;
        const iconurl="https://openweathermap.org/img/wn/"+iconcode+"@2x.png";
        const tempratureHtml="<p> "+temprature+" ْC</p>";
        const weatherHtml=  "<p> "+cityName+"</p> <p> "+description+"</p>" ;

        tempDivInfo.innerHTML=tempratureHtml; 
        weatherInfoDiv.innerHTML=weatherHtml;
        weatherIcon.src=iconurl;   
        weatherIcon.alt=description;
        
        showImage();

    }

}

// function local() {
// const url = 'https://ip-geo-location.p.rapidapi.com/ip/check?format=json';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '02c941dca7msh669cf9d8892eab4p1bc8c4jsn1803304bcfb6',
// 		'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// } }

function showImage() { 
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display='block'; 

}


