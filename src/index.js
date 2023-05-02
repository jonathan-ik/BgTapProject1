const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const users = require("../src/Routes/users");
const operators = require("./Routes/operators");
const authToken = require("./middlewares/authentication");
const lgaTable = require("./utils/lgatable");
const StatesTable = require("./utils/statestable");
const loadProductsTable = require("./utils/loadProductsTable");
const loadSeedTable = require("./utils/SeedTable");
//configure dotenv
dotenv.config();
const port = process.env.PORT || process.env.port;
const app = express();

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configure cors
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options("*", cors());

// for loading states and lga table immediately the server comes up

app.use(StatesTable);
app.use(lgaTable);

// for loading products and seeds table immediately the server comes up
app.use(loadProductsTable);
app.use(loadSeedTable);

// get request
app.get("/", (req, res) => {
  res.send("Web-project is UP");
});

app.use("/users", users);
app.use("/operators", operators);

// Handles a request to a non-existent route
app.use((req, res) => {
  const error = new Error(
    `The requested URL ${req.url} was not found on this server.`
  );
  error.status = 404;
  res.status(404).send(error.message);
});

app.listen(port, () => {
  console.log(`server up at http://localhost:${port}/`);
});
