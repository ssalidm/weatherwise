const apiKey = '52b588f119ce2c0784f394f66d3fa3b9'; 
const searchButton = document.getElementById('searchButton');
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');


searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const city = cityInput.value;
    fetchWeather(city); 
    // Clear the input field
    cityInput.value = '';
});

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    fetchWeather(city);
    // Clear the input field
    cityInput.value = '';
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
        <h2 class='city-name'>${data.name}, ${data.sys.country}</h2>
        <div class='weather-icon'>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">      
            <p class='temp-now'>${Math.round(data.main.temp)} °C</p>
        </div>
        <p class='weather-desc'>${data.weather[0].description}</p>
        <p><span class='min-temp'>Min: ${Math.round(data.main.temp_min)} °C</span> - <span class='max-temp'>Max: ${Math.round(data.main.temp_max)} °C</span></p>
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