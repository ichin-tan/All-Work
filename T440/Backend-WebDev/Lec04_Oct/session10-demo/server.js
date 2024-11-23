const express = require("express")
const app = express()
const port = process.env.PORT || 8080

// tells express to use EJS
app.set("view engine", "ejs")

// - extract data sent by <form> element in the client
app.use(express.urlencoded({extended:true}))

// setup sessions
const session = require('express-session')
app.use(session({
   secret: "the quick brown fox jumped over the lazy dog 1234567890",  // random string, used for configuring the session
   resave: false,
   saveUninitialized: true
}))

// database
const mongoose = require("mongoose");
require("dotenv").config();


// import the User
const User = require("./models/usermodel")
const Pokemon = require("./models/pokemonmodel")

app.get("/", (req,res) => {
    return res.render("home.ejs")
})

app.get("/faq", (req,res)=>{
    return res.render("faq.ejs")
})


// GET endpoint to retrieve all Pokemon
app.get("/api/pokemon", async (req, res) => {
    try {
        const pokemonList = await Pokemon.find();
        return res.json(pokemonList);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving pokemon", error: error.message });
    }
});

// GET endpoint to retrieve all Pokemon by a specific type
app.get("/api/pokemon/getByType/:type", async (req, res) => {
    console.log("What is the type????");
    console.log(req.params.type);
    try {
        const pokemonList = await Pokemon.find({ type: req.params.type });
        return res.json(pokemonList);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving pokemon", error: error.message });
    }
});

// GET endpoint to retrieve all Pokemon by a specific id
app.get("/api/pokemon/getById/:pokedexId", async (req, res) => {
    console.log("What is the id????");
    console.log(req.params.pokedexId);
    try {
        const pokemonList = await Pokemon.find({ pokedex_id: req.params.pokedexId });
        if(pokemonList.length === 0) {
            return res.send("There are no pokemons!")
        } else {
            return res.json(pokemonList[0]);
        }
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving pokemon", error: error.message });
    }
});

const startServer = async () => {   
   console.log(`The server is running on http://localhost:${port}`)
   console.log(`Press CTRL + C to exit`)

   // MongoDB Connection
   try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Success! Connected to MongoDB")
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }  

}
app.listen(port, startServer)