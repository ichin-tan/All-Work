const express = require("express")
const app = express()
const port = process.env.PORT || 8080


// If the server receives a request at / , respond by sending back the string "HELLO WORLD"
app.get("/", (req,res) => {
  return res.send("HELLO WORLD Ys!")
})

app.get("/download", (req,res) => {
    // return res.send("Downloading....!!")
})  

app.get("/area", (req,res) => {
    const radius = 5.5
    const area = radius * radius * Math.PI
    return res.send(`Area of circle with radius ${radius} is ${area}`)
})

const startServer = () => {
  console.log(`The server is running on http://localhost:${port}`)
  console.log(`Press CTRL + C to exit`)
}
app.listen(port, startServer)