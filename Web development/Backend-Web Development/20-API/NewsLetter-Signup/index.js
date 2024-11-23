// Required modules
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//This is for supporting local css files or image, must put in public folder
app.use(express.static("public"));

// Routes of application
app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
})
app.post("/failure", function(req,res) {
  res.redirect("/");
})

// What Browser send us(data that user entered in form)
app.post("/", function(req,res) {
  console.log(req.body.firstName + " " + req.body.lastName + " " + req.body.email);

  const object = {
    members: [
      {
        email_address: req.body.email,
        status: "subscribed",
        merge_fields: {
          FNAME: req.body.firstName,
          LNAME: req.body.lastName,
        }
      }
    ]
  };
  const jsonData = JSON.stringify(object);
  const url = "https://us21.api.mailchimp.com/3.0/lists/5b214c97bd";
  const options = {
    method: "POST",
    auth: "chintan:8c022f6dbacb1227d8f3c9249abfd91c-us21",
  };


  // Based on what browser sent us, we make request to chimpmail api
  const requestToChimpmail = https.request(url,options,function(mailchimpResponse) {
    if(mailchimpResponse.statusCode == 200) { res.sendFile(__dirname + "/success.html"); } else { res.sendFile(__dirname + "/failure.html"); }
    mailchimpResponse.on("data",function(data) {
      console.log(JSON.parse(data));
    })
  })
  requestToChimpmail.write(jsonData);
  requestToChimpmail.end();

})

// To listen to port number 3000
app.listen(3000, function() {
  console.log("Server started at port 3000");
})



// Api key
// 8c022f6dbacb1227d8f3c9249abfd91c-us21

// list id
// 5b214c97bd
