const weatherForm = document.querySelector(`form`);
const searchInput = document.querySelector(`input`);
const errorParagraph = document.querySelector(`.errorParagraph`);
const forecastParagraph = document.querySelector(`.forecastParagraph`);

weatherForm.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const city = searchInput.value;

    errorParagraph.textContent = `Loading...`;
    forecastParagraph.textContent = ``;

    fetch(`/weather?address=${city}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return errorParagraph.textContent = data.error;
            }
            forecastParagraph.textContent = data.forecast;
            searchInput.value = ``;
            errorParagraph.textContent = ``;
        })
    })
})