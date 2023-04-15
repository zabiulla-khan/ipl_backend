const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const playerSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  nationality: {
    type: String,
  },
  role: {
    type: String,
  },
  prize: {
    type: String,
  },
  tShirtNumber: {
    type: String,
  },
  totalMatchesPlayed: {
    type: Number,
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
