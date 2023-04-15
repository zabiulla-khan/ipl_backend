const express = require("express");
const {
  createTeam,
  getAllTeams,
  getATeam,
  teamCompleteDetail,
  deleteTeam,
  updateTeamInfo,
} = require("../controllers/team.controller");

const teamRouter = express.Router();

//API to create a team
teamRouter.post("/team/add", createTeam);

//API to get all teams
teamRouter.get("/team/all", getAllTeams);

//API to get a team
teamRouter.get("/team/:teamId", getATeam);

//API to get complete team Information
teamRouter.get("/team/details/:teamId", teamCompleteDetail);

//API to delete a team
teamRouter.delete("/team/:teamId", deleteTeam);

//API to update the team Information
teamRouter.patch("/team/:teamId", updateTeamInfo);

module.exports = teamRouter;
