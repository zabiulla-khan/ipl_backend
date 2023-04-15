const express = require("express");
const {
  createPlayer,
  getAllPlayers,
  getPlayerDetail,
  updatePlayerInfo,
  deletePlayer,
  addPlayerToTeam,
} = require("../controllers/player.controller");

const playerRouter = express.Router();

// API to create a player
playerRouter.post("/player", createPlayer);

//API to get all players
playerRouter.get("/players/all", getAllPlayers);

//API to get a player detail
playerRouter.get("/player/:playerId", getPlayerDetail);

//API to update player information
playerRouter.patch("/player/:playerId", updatePlayerInfo);

//API to delete player
playerRouter.delete("/player/:playerId", deletePlayer);

//API to add player into the thier respective Team
playerRouter.patch("/team/:teamId/player/:playerId", addPlayerToTeam);

module.exports = playerRouter;
