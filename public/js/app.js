const weatherForm = document.querySelector(`form`);
const searchInput = document.querySelector(`input`);
const errorParagraph = document.querySelector(`.errorParagraph`);
const forecastLocation = document.querySelector(`.forecast-location`);
const forecastTemperature = document.querySelector(`.forecast-temperature`)
const forecastParagraph = document.querySelector(`.forecastParagraph`);
const weatherImg = document.querySelector(`.weather-icon`);

weatherForm.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const city = searchInput.value;

    errorParagraph.textContent = `Loading...`;
    forecastLocation.textContent = ``;
    forecastTemperature.textContent = ``;
    forecastParagraph.textContent = ``;


    fetch(`/weather?address=${city}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return errorParagraph.textContent = data.error;
            }
            console.log(data);

            forecastLocation.textContent = `${data.location}, ${data.state}`;
            forecastTemperature.textContent = `${data.temperature} ℉`;
            forecastParagraph.textContent = data.forecast;
            searchInput.value = ``;
            errorParagraph.textContent = ``;
            weatherImg.src = data.icon;
        })
    })
})