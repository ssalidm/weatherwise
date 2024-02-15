const apiKey = '52b588f119ce2c0784f394f66d3fa3b9'; 
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    fetchWeather(city);
});

function fetchWeather(city) {
    // Construct OpenWeatherMap API URLs for:
    // 1. Current weather
    // 2. Hourly forecast
    // 3. 10-day forecast
    // (See https://openweathermap.org/api/one-call-api)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayCurrentWeather(data))
        .catch(error => console.error('Error fetching weather:', error));

    // ... (similarly fetch and display hourly and daily forecast)
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.querySelector('.current-weather');
    currentWeatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Min: ${data.main.temp_min} °C, Max: ${data.main.temp_max} °C</p>
    `;
}

function displayDailyForecast(dailyData) {
    const dailyForecastDiv = document.querySelector('.daily-forecast');
    dailyForecastDiv.innerHTML = ''; // Clear any previous forecast

    for (let i = 0; i < 7; i++) { 
        const day = dailyData[i];

        const dailyItem = document.createElement('div');
        dailyItem.classList.add('daily-item');
        dailyItem.innerHTML = `
            <h3>${getDayOfWeek(day.dt)}</h3> 
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
            <p>${day.temp.day} °C</p>
            <p>${day.weather[0].description}</p> 
        `;
        dailyForecastDiv.appendChild(dailyItem); 
    }
}

function getDayOfWeek(timestamp) {
    const date = new Date(timestamp * 1000); 
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
}

