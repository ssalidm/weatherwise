const apiKey = '52b588f119ce2c0784f394f66d3fa3b9'; 
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    fetchWeather(city);
});

function fetchWeather(city) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayCurrentWeather(data))
        .catch(error => console.error('Error fetching weather:', error));     

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


function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        // Handle the case where Geolocation is not supported
        console.log('Geolocation is not supported by this browser.'); 
        // You may want to use a default city instead
    }
}

function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayCurrentWeather(data)) 
        .catch(error => console.error('Error fetching weather:', error));
}

function error() {
    // Handle geolocation permission denied or other errors
    console.error('Unable to retrieve your location');
    // Optionally use a default city for initial display
}

// Automatically try to fetch the weather at start
getCurrentLocationWeather(); 