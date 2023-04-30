const express = require("express");
const operators = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const {
  authToken,
  operatorAuthToken,
} = require("../middlewares/authentication");
const {
  createoperator,
  operatorLogin,
  operatorCompleteRegistration,
} = require("../controllers/operatorcontroller");

//add an operator(signup)

operators.post("/", authToken, async (req, res) => {
  try {
    let result = await createoperator(req);
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.log("Error validating operator data:", error);
    res.status(409).send({ error });
  }
});

operators.post("/login", async (req, res) => {
  try {
    let result = await operatorLogin(req);
    let token = jwt.sign({ reg_id: result }, process.env.JWT_SECRET1, {
      expiresIn: 3600,
    });
    res.status(201).json({ reg_id: result, token });
  } catch (error) {
    console.log("Error at login:", error);
    res.status(409).send({ error });
  }
});

const upload = multer({ dest: "uploads/" });

operators.post(
  "/register",
  operatorAuthToken,
  upload.single("picture"),
  async (req, res) => {
    try {
      let result = await operatorCompleteRegistration(req);
      console.log(result);
      res.status(201).json(result);
    } catch (error) {
      console.log("Error validating operator data:", error);
      res.status(409).send({ error });
    }
  }
);

module.exports = operators;
