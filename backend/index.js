const app = require("express")();
const consign = require("consign");
const db = require("./config/db");
const mongoose = require("mongoose")

require('./config/mongodb.js')

app.db = db;
app.mongoose = mongoose;
consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./schedule")
  .then("./config/routes.js")
  .into(app);
app.listen(3000, () => {
  console.log("\x1b[32m", "=> Backend Executando :) !", "\x1b[0m");
});
