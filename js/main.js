// input
var searchInput = document.getElementById('search')

// today
var todayName = document.getElementById('todayDate-dayName')
var todayNumber = document.getElementById('todayDate-dayNumber')
var todayMonth = document.getElementById('todayDate-month')
var todayLocation = document.getElementById('todayLocation')
var todayTemp = document.getElementById('todayTemp')
var todayConditionImg = document.getElementById('today_condition_img')
var todayConditionText = document.getElementById('today-condition-text')
var humidity = document.getElementById('humidity')
var wind = document.getElementById('wind')
var windDirection = document.getElementById('wind-direction')

// Next

var nextDay = document.getElementsByClassName('nextDay-name')
var nextMaxTemp = document.getElementsByClassName('next-max-temp')
var nextMinTemp = document.getElementsByClassName('next-min-temp')
var nextConditionImg = document.getElementsByClassName('next-condition-img')
var nextConditionText = document.getElementsByClassName('next-condition-text')



// fetch API data
async function getWeatherData(cityname){
    var weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6af8abb4527d430b9ba223812241811&q=07112${cityname}&days=3`);
    var weatherData = await weatherResponse.json();
    return weatherData
    
}
function displayToday(data)
{
    var todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"});
    todayNumber.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"});
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src","https:" + data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity +"%";
    wind.innerHTML = data.current.wind_kph + " km/h";
    windDirection.innerHTML = data.current.wind_dir;

}
async function displayNextData(data) {
    var forecastData = data.forecast.forecastday;
    for(var i=0; i<2 ; i++){
        var nextdate = new Date(forecastData[i+1].date);
        nextDay[i].innerHTML = nextdate.toLocaleDateString("en-US",{weekday:"long"});
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c;
        nextConditionImg[i].setAttribute('src',"https:"+forecastData[i+1].day.condition.icon);
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text;
    }
    
}
async function startApp(city="cairo") {
    var weatherData = await getWeatherData(city);
    if(!weatherData.error)
        {
        displayToday(weatherData);
        displayNextData(weatherData);
        }
    
}
startApp()
searchInput.addEventListener('input', function(){
    startApp(searchInput.value)
})