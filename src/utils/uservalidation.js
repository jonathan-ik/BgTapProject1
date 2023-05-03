const pool = require("../db");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const validator = require("validator");
const jwt = require("jsonwebtoken");
dotenv.config();

const getUserId = (req) => {
  return new Promise((resolve, reject) => {
    try {
      const jwtToken = req.headers.authorization;
      const decodedToken = jwt.decode(jwtToken);
      // console.log("Decoded token: ", decodedToken);
      const user_id = parseInt(decodedToken.user_id);
      // console.log(user_id);
      resolve(user_id);
    } catch (error) {
      reject(error);
    }
  });
};

// check if the email provided is already in the database
const checkDuplicateEmail = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const email = req.body.email;

      const conn = await pool.connect();
      const result = await conn.query("SELECT email from users;");
      const rows = result.rows;
      conn.release();

      const check = rows.find((user) => {
        return user.email.trim() === email.trim();
      });

      resolve(check);
    } catch (error) {
      reject(error);
    }
  });
};

const validateUserReg = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const requiredKeys = ["email", "password"];
      const { email, password } = req.body;

      for (const key in req.body) {
        if (!requiredKeys.includes(key)) {
          reject(
            `'${key}' not required. Only email, password, are allowed in request body`
          );
        }
      }

      if (email.trim() === "" || password.trim() === "") {
        reject("Email, password must be provided");
      } else if (!validator.isEmail(email)) {
        reject("Email is invalid");
      } else if (await checkDuplicateEmail(req)) {
        reject("Email already exists");
      } else {
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const requiredKeysValidator = (req, requiredKeysArray) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(req.body);
    const missingKeys = requiredKeysArray.filter((key) => !keys.includes(key));
    // console.log(missingKeys);

    if (missingKeys.length > 0) {
      reject(`Missing required keys: ${missingKeys.join(", ")}`);
    }

    for (const key in req.body) {
      if (!requiredKeysArray.includes(key)) {
        reject(`'${key}' not expected. Only ${requiredKeysArray} are allowed`);
      }
    }
    resolve(true);
  });
};

module.exports = { validateUserReg, requiredKeysValidator, getUserId };
