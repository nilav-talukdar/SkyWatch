const input = document.querySelector('.city-input');
const button = document.querySelector('.btn');
const output = document.querySelector('.output');
const outputContent = output.innerHTML;
button.addEventListener('click', () => {
    let inputText = input.value;
    if(inputText != '') {
        weatherData(inputText);
    } else {
        alert('You must enter a city to proceed');
    }
    input.value = '';
});
const weatherData = async (inputText) => {
const key = '82b3364f7dfe888d8a3465fddce3122c';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${key}&units=metric`;
let data = await fetch(url);
let response = await data.json();
if(response.cod == 404) {
    output.classList.remove('display');
    output.innerHTML = `<img class="error-img" src="404.png">
                        <p class="error-text">Not found !</p>`
    output.classList.add('error');
    error.setAttribute('style', '');
} else {
    output.classList.remove('error');
    output.innerHTML = outputContent;
    let weatherImage = document.querySelector('.weather-img');
    if(response.weather[0].main == 'Mist') {
        weatherImage.setAttribute('src', 'mist.png');
    } else if(response.weather[0].main == 'Clouds') {
        weatherImage.setAttribute('src', 'cloud.png');
    } else if(response.weather[0].main == 'Rain') {
        weatherImage.setAttribute('src', 'rain.png');
    } else if(response.weather[0].main == 'Snow') {
        weatherImage.setAttribute('src', 'snow.png');
    } else if(response.weather[0].main == 'Clear') {
        weatherImage.setAttribute('src', 'clear.png');
    } else {
        weatherImage.setAttribute('src', 'cloud.png');
    }
    let temp = document.querySelector('.temp-text');
    temp.innerText = response.main.temp;
    let weatherConditionText = document.querySelector('.weather-condition-text');
    weatherConditionText.innerText = response.weather[0].description
    let humidityText = document.querySelector('.h-text');
    humidityText.innerText = response.main.humidity;
    let windSpeed = document.querySelector('.w-text');
    let speed = String(3.6 * response.wind.speed);
    windSpeed.innerText = speed.slice(0, 4);
    }
    output.classList.add('display');
}