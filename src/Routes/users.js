const express = require("express");
const users = express.Router();
const jwt = require("jsonwebtoken");
const {
  userLogin,
  createUser,
  getAllUsers,
} = require("../controllers/usercontroller");
const authToken = require("../middlewares/authentication");

//add a user(signup)
users.post("/", async (req, res) => {
  try {
    let result = await createUser(req);
    res.status(201).json(result);
  } catch (error) {
    // console.log("Error validating user data:", error);
    res.status(409).send({ error });
  }
});

// login
users.post("/login", async (req, res) => {
  try {
    let result = await userLogin(req);
    let token = jwt.sign({ user_id: result }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.status(201).send({ result, token });
  } catch (error) {
    // console.log("Error at login:", error);
    res.status(409).send({ error });
  }
});

// //get all users
// users.get("/", authToken, async (req, res) => {
//   try {
//     const users = await getAllUsers();
//     res.json(users);
//   } catch (error) {
//     console.log("Error retrieving users:", error);
//     res.status(500).send({ error });
//   }
// });

module.exports = users;
