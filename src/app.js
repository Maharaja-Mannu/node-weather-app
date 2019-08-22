const path = require('path')
const express = require('express')
const hbs = require('hbs')
// load files
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))
// app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        home: 'active',
        name: 'Mannu'
    })

})
// app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        about: 'active',
        name: "Mannu"
    })
})
// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need Help',
        help: 'active',
        name: 'Mannu'
    })
})
// app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        product: []
    })
})

// if no any page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found',
        name: 'Mannu'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Mannu'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})