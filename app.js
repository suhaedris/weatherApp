
function getWeather(){
    const apiKey ="624e8a4acecd2e9b879f5cc4c8451956";
    const city = document.getElementById("cityInput").value;
    if(!city){
        alert("Please enter a city");
        return;
    }
    const currentWeatherurl = "https://api.openweathermap.org/data/2.5/weather?q="+ city+ "&appid="+ apiKey+"&units=metric";
    const forecasturl = "https://api.openweathermap.org/data/2.5/forecast?q="+city +"&appid="+ apiKey+"&units=metric";
    fetch(currentWeatherurl)
    .then(response => response.json())
    .then(data => {
        displayweather(data);
    })
    .catch(error => {
        console.error('error fetching current weather data:', error);
        alert("Error fetching current weather data. Please try again");
    });
    fetch(forecasturl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForcast(data.list);
    })
    .catch(error => {
        console.error('error fetching hourly forcast data:', error);
        alert("Error fetching hourly forcast data. Please try again");
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
function displayHourlyForcast(hourlydata){
    const hourlyForcastDiv= document.getElementById('hourly-forcast');
    const next24Hours = hourlydata.slice(0,8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt *1000);
        const hour= dateTime.getHours();
        const temprature= item.main.temp;
        const iconcode= item.weather[0].icon;
        const iconurl= "https://openweathermap.org/img/wn/"+iconcode+"@2x.png";

        const hourlyItemHtml= `<div class="hourly-item" >
        <span> ${hour}:00</span>
        <img src="${iconurl}" alt="Hourly weather icon">
        <span>${temprature} ْC</span>
        </div> `;

        hourlyForcastDiv.innerHTML+=hourlyItemHtml;
    });
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

