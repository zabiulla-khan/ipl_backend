const Player = require("../models/player.model");
const Team = require("../models/team.model");

const createPlayer = async (req, res) => {
  try {
    const player = req.body;
    const response = await Player.create(player);
    if (response) {
      res.json({ message: response });
    } else {
      res.json({ mesaage: "Enter credintials correctly" });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error",
    });
  }
};

const getAllPlayers = async (req, res) => {
  try {
    const response = await Player.find();
    if (response) {
      res.json({ message: response });
    } else {
      res.json({ message: "Your search does not found" });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error",
    });
  }
};

const getPlayerDetail = async (req, res) => {
  try {
    const response = await Player.findById(req.params.playerId);
    if (response) {
      res.json({ message: response });
    } else {
      res.json({ message: "Your search does not found" });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error",
    });
  }
};

const updatePlayerInfo = async (req, res) => {
  try {
    const player = await Player.findById(req.params.playerId);
    if (player) {
      // infos to be updated

      player.age = req.body.age || player.age;
      player.totalMatchesPlayed =
        req.body.totalMatchesPlayed || player.totalMatchesPlayed;
      player.prize = req.body.prize || player.prize;

      await player.save(); // updates and save the player information in Database

      res.json({ message: player });
    } else {
      res.json({ message: "Player not found" });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error",
    });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.playerId);
    if (player) {
      const player = await Player.deleteOne({ _id: req.params.playerId });

      res.json({ message: player });
    } else {
      res.json({ message: "Player not found" });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error",
    });
  }
};

const addPlayerToTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (team) {
      const player = await Player.findById(req.params.playerId);
      if (player) {
        team.players.push(player._id);
        await team.save();
        res.json({ message: "Player added to the team successfully" });
      } else {
        res.json({ message: "Team is found but Player is not found" });
      }
    } else {
      res.json({ message: "Team not found" });
    }
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayerDetail,
  updatePlayerInfo,
  deletePlayer,
  addPlayerToTeam,
};
