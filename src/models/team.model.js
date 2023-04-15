const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const teamSchema = new Schema({
  teamName: {
    type: String,
  },
  city: {
    type: String,
  },
  color: {
    type: String,
  },
  size: {
    type: Number,
  },
  owner: {
    type: String,
  },
  captain: {
    type: String,
  },
  viceCaptain: {
    type: String,
  },
  players: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Player",
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
