const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config");

const url = config.bd_string;
const options = {
  poolSize: 5,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.set("useCreateIndex", true);
mongoose.connect(url, options);
mongoose.connection.on("error", (err) => {
  console.log(`Erro na conexão com banco de dados ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Banco de dados foi desconectado`);
});

mongoose.connection.on("connected", () => {
  console.log(`Aplicação conectada ao banco de dados`);
});

const indexRoute = require("./Routes/index");
const usersRoute = require("./Routes/users");

app.use(express.json());
app.use("/", indexRoute);
app.use("/users", usersRoute);

app.listen(3000, () => {
  console.log("Server running");
});

module.exports = app;
