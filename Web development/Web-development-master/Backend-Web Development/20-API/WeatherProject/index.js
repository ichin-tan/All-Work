const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res) {
  const query = req.body.cityName;
  const apiKey = "7be661621bd1b79439fc2c635d4a6391";
  const unit = "metric";
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(externalResponse) {
    console.log(externalResponse.statusCode);
    externalResponse.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const fetchedDataDescription = weatherData.weather[0].description;
      const fetchedDataTemp = weatherData.main.temp;
      const fetchedIcon = weatherData.weather[0].icon;
      const iconURL = "https://openweathermap.org/img/wn/" + fetchedIcon + "@2x.png";

      res.write("<h1> The temprature in " + req.body.cityName + " is " + fetchedDataTemp + " degree celcius" + "</h1>");
      res.write("<h3>" + fetchedDataDescription + "</h3>")
      res.write("<img src=" + iconURL + ">");
      res.send();
    })
  })
})





app.listen(3000, function() {
  console.log("Server started on port 3000");
})
