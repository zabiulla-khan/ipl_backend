const Team = require("../models/team.model");

const createTeam = async (req, res) => {
  const team = req.body;
  console.log(team);

  const response = await Team.create(team);
  res.json({ message: response });
};

const getAllTeams = async (req, res) => {
  const response = await Team.find().populate("players");
  res.json({ mesaage: response });
};

const getATeam = async (req, res) => {
  const teamId = req.params.teamId;
  const response = await Team.findById(teamId);
  res.json({ message: response });
};

const teamCompleteDetail = async (req, res) => {
  try {
    const teams = await Team.findById(req.params.teamId).populate("players");
    if (teams) {
      res.json({ message: teams });
    } else {
      res.json({ message: "Team Id is not found" });
    }
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (team) {
      const team = await Team.deleteOne({ _id: req.params.teamId });

      res.json({ message: team });
    } else {
      res.json({ message: "Team not found" });
    }
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
};

const updateTeamInfo = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (team) {
      // infos to be updating in team

      team.teamName = req.body.teamName || team.teamName;
      team.city = req.body.city || team.city;
      team.color = req.body.color || team.color;
      team.size = req.body.size || team.size;
      team.owner = req.body.owner || team.owner;
      team.captain = req.body.captain || team.captain;
      team.viceCaptain = req.body.viceCaptain || team.viceCaptain;

      await team.save();

      res.json({ message: team });
    } else {
      res.json({ message: "Team not found" });
    }
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
};
module.exports = {
  createTeam,
  getAllTeams,
  getATeam,
  teamCompleteDetail,
  deleteTeam,
  updateTeamInfo,
};
