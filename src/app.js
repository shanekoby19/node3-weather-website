const path = require(`path`);
const express = require(`express`);
const hbs = require(`hbs`);
const geocode = require(`./utils/geocode`);
const forecast = require(`./utils/forecast`);


// Create a new express app.
const app = express();
const port = process.env.PORT || 3000;

// Define path variables.
const viewsPath = path.join(__dirname, `../templates/views`);
const partialsPath = path.join(__dirname, `../templates/partials`);
const publicDirectoryPath = path.join(__dirname, `../public`);

// Sets the view engine to hbs and changes the path of the views directory.
app.set(`view engine`, `hbs`);
app.set(`views`, viewsPath);
hbs.registerPartials(partialsPath);

// Setup the static directory we want to serve. 
app.use(express.static(publicDirectoryPath));

// Set up a route for the homepage.
app.get(``, (req, res) => {
    // No file extension is neccessary here.
    res.render(`index`, {
        title: `Weather App`,
        name: `Shane Kobylecky`,
    });
});

// Set up a route for the about page.
app.get(`/about`, (req, res) => {
    res.render(`about`, {
        title: `Robo-Tron`,
        name: `Shane Kobylecky`,
    })
})

// Set up a route for the help page.
app.get(`/help`, (req, res) => {
    res.render(`help`, {
        title: `Help`, 
        name: `Shane Kobylecky`,
        errorMessage: `Unable to connect to server. Please try again in a minute.`,
    })
})

// Set up a route for our weather app.
app.get(`/weather`, (req, res) => {
    if(req.query.address) {
        //JSON Send
        geocode(req.query.address, (error, {lat, long} = {}) => {
            if(error) {
                return res.send({
                    error: error,
                }) // Immediately exit after printing the error to the console.
            }
            forecast(lat, long, (error, response) => {
                if(error) {
                    return res.send({
                        error: error
                    })
                }
                response.forecast = `${response.location} ${response.state} is currently ${response.weather_description.toLowerCase()} with a temperature of ${response.temperature} degrees farrenheit.`;
                res.send({
                    forecast: response.forecast,
                    location: response.location, 
                    state: response.state, 
                    temperature: response.temperature,
                    icon: response.icon,
                });
            });
        })
    } else {
        res.send({
            error: `No address was provided but one was required.`
        })
    }
});

app.get(`/products`, (req, res) => {
    if(req.query.search) {
        res.send({
            products: [],
        })
    }
    else {
        res.render(`404`, {
            title: `Error`,
            errorMessage: `No search query was given but one was required.`,
            name: `Shane Kobylecky`
        })
    }
})

// Set up an error page for all help pages that aren't found.
app.get(`/help/*`, (req, res) => {
    res.render(`404`, {
        title: `404`,
        errorMessage: `404 Error: Sorry this help page could not be found.`,
        name: `Shane Kobylecky`
    })
})

// Set up an error page for all pages that aren't found.
app.get(`*`, (req, res) => {
    res.render(`404`, {
        title: `404`,
        errorMessage: `404 Error: Page not found.`,
        name: `Shane Kobylecky`
    })
})

// Start the server.
app.listen(port, () => {
    console.log(`The server is running on port ${port}.`)
})