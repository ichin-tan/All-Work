const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
    name: { type: String },
    pokedex_id: { type: Number },
    type: { type: String },
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Pokemon", pokemonSchema);