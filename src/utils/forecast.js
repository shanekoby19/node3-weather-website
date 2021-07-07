const request = require(`request`);

const forecast = function(lat, long, callback) {
    // Weather API
    const baseURL = `http://api.weatherstack.com/current?`;
    const apiKey = `8c341678f3f78ad90488047fde6f9883`;

    // Request weather data based on the city given.
    const requestURL = `${baseURL}access_key=${apiKey}&query=${long},${lat}&units=f`
    request({url: requestURL, json: true}, (error, response) => {
        if(error) {
            callback(`Sorry, it looks like we are unable to connect to the weather service at this time.`, undefined);
        }
        else if(response.body.error) {
            callback(`Input Error: ${response.body.error.info}`, undefined);
        }
        else {
            const data = response.body;
            callback(undefined, {
                temperature: data.current.temperature,
                weather_description: data.current.weather_descriptions[0],
                location: data.location.name,
                state: data.location.region,
            });
        }
    });
}

module.exports = forecast;