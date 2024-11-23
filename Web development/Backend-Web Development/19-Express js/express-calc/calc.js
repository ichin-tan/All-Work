const ex = require("express");
const bodyParser = require("body-parser");
const app = ex();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
  var result = Number(req.body.num1) + Number(req.body.num2);
  res.send("The answer is " + result);
})

app.listen(3000, function() {
  console.log("Server started on port 3000 ");
})
