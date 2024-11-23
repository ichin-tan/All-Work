const express = require('express')
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));

const movies = [
    {title:"Deadpool & Wolverine", starRating:3, likes:100},
    {title:"Transformer One", starRating:5, likes:3},
    {title:"Blink Twice", starRating:2, likes:5},
    {title:"Uglies", starRating:1, likes:8},
]
 

app.get("/movies",(req,res) => {
    res.render("movies.ejs", {arrMovies: movies})
})

app.post("/like", (req,res) => {
    for(i=0; i<movies.length; i++) {
        movies[i].likes++;
    }
    res.redirect("/movies")
})

app.post("/star", (req,res) => {
    console.log(req.body.updatedStarRating);
    const starRating = parseInt(req.body.updatedStarRating)
    for (movie of movies) {
        movie.starRating = starRating;
    }
    return res.redirect("/movies")
})

app.get('/', function (req, res) {
  res.render("example.ejs", {name: "Chintan", favColor: "Green", hasPet: true})
})

app.get("/drive/:age", (req,res) => {
    console.log(req.params.age);
    res.render("drive.ejs", {age: req.params.age})
})

app.get("/students", (req,res) => {
    res.render("students.ejs", { arrStudents: [
        {name: "Chintan", score: 5.0},
        {name: "Riddhi", score: 4.7},
        {name: "Kirtan", score: 4.0},
        {name: "Harsh", score: 2.0}
    ] })
})

app.listen(3000)