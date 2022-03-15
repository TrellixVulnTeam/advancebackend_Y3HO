const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()
// telling my app to use ejs as the default template engine
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
  extended: true
}))
// code to serve the static files
app.use(express.static("public"))
app.get('/', (req, res) => {
  res.render('index', {data: ''});
})
app.post('/', (req, res) => {
  const location = req.body.location ? req.body.location : "Chennai";
  const appid = "53b439639756f379f0f11ce00e0b8f78";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appid}`
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        res.render('index', {data: weatherData});
      })
    } else {
      res.render('index', {data: "0"})
    }
  })
})
app.listen(5500, 'localhost')