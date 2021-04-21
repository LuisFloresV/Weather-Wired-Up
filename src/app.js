const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geoCode = require('../utils/geoCode')
const foreCast = require('../utils/foreCast')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//Setup for the static directory
app.use(express.static(path.join(__dirname, '../public')))

//Routes
app.get('/', function (req, res, next) {
  res.render('index', {
    name: 'Naoko',
    title: 'Weather App',
  })
})

app.get('/help', function (req, res, next) {
  res.render('help', {
    name: 'Naoko',
    title: 'Help Page',
    message: "Example of the help message"
  })
})

app.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'About Me',
    name: 'Naoko',
  })
})

app.get('/weather', function (req, res, next) {
  if (!req.query.address) {
    return res.send({ error: true, message: "Address must be provided" })
  }
  geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error: true, message: error })
    }
    foreCast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: true, message: error })
      }
      res.send({ forecastData, location, query: req.query.address })
    })
  }
  )
})

app.get('/products', function (req, res, next) {
  console.log(req.query)
  res.send({
    products: []
  })
})

//404 Help articles
app.get('/help/*', function (req, res, next) {
  res.render('404', {
    name: 'Naoko',
    title: '404',
    errorMessage: 'Help article not found'
  })
})

//404 Handler
app.get('*', function (req, res, next) {
  res.render('404', {
    name: 'Naoko',
    title: '404',
    errorMessage: 'Page not found'
  })
})

app.listen(9000, () => { console.log(`Server listening on port 9000`) })