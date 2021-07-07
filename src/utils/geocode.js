const request = require(`request`);

// Mapbox API --> Geocoding
const geocode = function(city, callback) {
    const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1Ijoic2tvYnlsZWNreTEiLCJhIjoiY2txcGxsY29rMHhlejJubWhnMmUxeDJnaCJ9.zayeoYf8grXrbW2YmvOHJw&limit=1`
    
    request({url: mapboxURL, json: true}, (error, response) => {
        if(error) {
            callback(`Sorry we are unable to connect to mapbox at this time. Please check your internet connection and try again.`, undefined);
        }
        else if(response.body.message) {
            callback(`Error: ${response.body.message}`, undefined)
        }
        else if(response.body.features.length === 0) {
            callback(`Error: No results found for that location.`, undefined)
        }
        else {
            const data = response.body;
            callback(undefined, {
                city: data.features[0].place_name.split(`,`)[0],
                state: data.features[0].place_name.split(`,`)[1],
                lat: data.features[0].center[0],
                long: data.features[0].center[1],
            });
        }
    });
}

module.exports = geocode;