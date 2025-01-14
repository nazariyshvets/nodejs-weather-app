import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config.js'
import express from 'express'
import hbs from 'hbs'
import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Nazarii Shvets'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Nazarii Shvets'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Here\'s a help message',
    name: 'Nazarii Shvets'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address

  if (!address) {
    return res.send({
      error: 'Address is required'
    })
  }

  geocode(address).then(({ latitude, longitude, location }) => {
    forecast(latitude, longitude).then(({ temperature, feelslike }) => {
      res.send({
        location,
        forecast: `It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`
      })
    }).catch((error) => {
      res.send({
        error
      })
    })
  }).catch((error) => {
    res.send({
      error
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help article not found.',
    name: 'Nazarii Shvets'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not found.',
    name: 'Nazarii Shvets'
  })
})

app.listen(8000, () => {
  console.log('The server is up and running on port 8000')
})