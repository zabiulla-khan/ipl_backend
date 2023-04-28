const express = require("express");
const bodyParser = require("body-parser");
const teamRouter = require("./src/routes/team.routes");
const playerRouter = require("./src/routes/player.routes");
const adminRouter = require("./src/routes/admin.routes");
const dbConnection = require("./src/config/db.config");

const app = express();
app.use(bodyParser.json());
app.use(teamRouter);
app.use(playerRouter);
app.use(adminRouter);

app.get("/", (req, res) => {
  res.json({
    message: "ok",
    response: "success",
    result: "Last class",
  });
});

app.listen(3000, async () => {
  console.log("server listening on port 3000");
  await dbConnection();
});
