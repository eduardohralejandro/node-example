const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
// define paths for express config

const publicDirectoryPath = path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials');
// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather',
        name: 'Edu'
    });
});

app.get('/weather', (request, response) => {

    
    if (!request.query.address) {
       return response.send({
            error: 'You must provide an address'
        });
    }

    geocode(request.query.address, (error, data) => {

        if (error) {
           return  response.send({ error });
        }
    
        forecast(data.latitude, data.longitude, (error, foreCastData) => {
            if (error) {
                return response.send({ error })
            }

            response.send({
                location: data.location,
                forecast: foreCastData,
                address: request.query.address
            })
        })
    })
});



app.get('/products', (request, response) => {
    console.log(request.query);
    if (!request.query.search) {
       return response.send({
            error: 'You must provide a search term',
        })
    }

    response.send({
        products: [],
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About me',
        name: 'Eduardo'
    })
});

app.get('/help', (request, response) => {
    response.render('help', {
        helpText: 'Helpful text',
        title: 'help',
        name: 'Eduardo'
    })
});

app.get('/help/*', (request, response) => {
    response.send('help article not found')
})

app.get('*', (request, response) => {
    response.send('my 404 page');
});


app.listen(port, () => {
    console.log('server is up on port ' + port);
});