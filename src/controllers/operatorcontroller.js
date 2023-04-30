const pool = require("../db");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const fs = require("fs");
const uservalidation = require("../utils/uservalidation");
const {
  userNationality,
  userState,
  userLga,
  operatorValidation,
  registion_id,
} = require("../utils/operatorUtils");

dotenv.config();

const createoperator = async (req) => {
  try {
    const requiredKeys = ["email", "password"];
    uservalidation.requiredKeysValidator(req, requiredKeys);

    const { email, password } = req.body;

    // gets user id from token and connects to database
    const user_id = await uservalidation.getUserId(req);
    const conn = await pool.connect();

    // check if the email belongs to the user_id
    const userResult = await conn.query(
      "SELECT email FROM users WHERE user_id = $1",
      [user_id]
    );
    const user = userResult.rows[0];
    if (user.email !== email) {
      conn.release();
      return Promise.reject("Wrong user token");
    }

    // check if email already exists in operator registration table
    const operatorResult = await conn.query(
      "SELECT * FROM operator_registration WHERE email = $1;",
      [email]
    );
    if (operatorResult.rows.length > 0) {
      conn.release();
      return Promise.reject("Email already exists");
    }

    // check if password matches the email
    const passwordResult = await conn.query(
      "SELECT password FROM users WHERE email = $1",
      [email]
    );
    const passwordHash = passwordResult.rows[0].password;
    const isPasswordMatch = bcrypt.compareSync(
      password + process.env.BCRYPT_PASSWORD,
      passwordHash
    );
    if (!isPasswordMatch) {
      conn.release();
      return Promise.reject("Incorrect password");
    }

    // insert operator registration details
    const insertOperatorSql = `INSERT INTO operator_registration(email, password, user_id)
          VALUES ($1, $2, $3)
          RETURNING *`;
    const hashPassword = bcrypt.hashSync(
      password + process.env.BCRYPT_PASSWORD,
      parseInt(process.env.SALT_ROUNDS)
    );
    const insertOperatorValues = [email, hashPassword, user_id];
    const operatorInsertResult = await conn.query(
      insertOperatorSql,
      insertOperatorValues
    );
    conn.release();
    return Promise.resolve(operatorInsertResult.rows[0]);
  } catch (error) {
    return Promise.reject(error);
  }
};

const operatorLogin = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const requiredKeys = ["email", "password"];
      uservalidation.requiredKeysValidator(req, requiredKeys);

      const { email, password } = req.body;

      const conn = await pool.connect();
      const sql = `SELECT r.reg_id, u.password FROM operator_registration r 
                    INNER JOIN users u ON r.user_id = u.user_id
                    WHERE r.email = $1`;
      const values = [email];
      const result = await conn.query(sql, values);
      const rows = result.rows;
      conn.release();

      if (rows.length > 0) {
        const matchPassword = await bcrypt.compare(
          password + process.env.BCRYPT_PASSWORD,
          rows[0].password
        );
        if (matchPassword) {
          resolve(rows[0].reg_id);
        } else {
          reject("Invalid email and/or password");
        }
      } else {
        reject("Invalid email and/or password");
      }
    } catch (error) {
      reject(error);
    }
  });
};

const operatorCompleteRegistration = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const reg_id = await registion_id(req);

      const {
        firstname,
        lastname,
        phonenumber,
        nationality,
        state,
        lga,
        sex,
        dateofbirth,
        nin,
      } = req.body;
      if (!req.file) {
        //   // Check that a picture file is uploaded
        reject("Upload a Picture");
      }
      console.log(req.file);
      const picture = fs.readFileSync(req.file.path);
      // Check if operator is signed up
      const conn = await pool.connect();
      const checkRegistrationSql =
        "SELECT * FROM operator_registration WHERE reg_id = ($1)";
      const checkRegistrationValues = [reg_id];
      const checkRegistrationResult = await conn.query(
        checkRegistrationSql,
        checkRegistrationValues
      );
      const operatorRegistration = checkRegistrationResult.rows[0];

      if (!operatorRegistration) {
        reject("You have to be an operator to complete registration");
        return;
      }

      // Check if operator already completed registration
      const checkProfileSql =
        "SELECT * FROM operator_profile WHERE reg_id = ($1)";
      const checkProfileValues = [reg_id];
      const checkProfileResult = await conn.query(
        checkProfileSql,
        checkProfileValues
      );
      const operatorProfile = checkProfileResult.rows[0];

      if (operatorProfile) {
        reject("You have already completed this registration");
        return;
      }
      //validate operator data fields
      await operatorValidation(req);
      //validate nationality
      await userNationality(req);

      // validate state
      await userState(req);

      //validate Local Gaovernment Area
      await userLga(req);

      const foundNINQuery = "SELECT * FROM operator_profile WHERE nin = $1";
      const foundNINResult = await pool.query(foundNINQuery, [nin]);
      const foundNIN = foundNINResult.rows[0];
      if (foundNIN) {
        reject("NIN already in use, Please provide another NIN");
      }

      // Insert operator profile
      const insertSql = `INSERT INTO operator_profile (reg_id, firstname, lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin, picture ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;
      const insertValues = [
        reg_id,
        firstname,
        lastname,
        phonenumber,
        nationality,
        state,
        lga,
        sex.toLowerCase(),
        dateofbirth,
        nin,
        picture,
      ];
      const newPicturePath = `uploads/${req.file.originalname}`;

      fs.unlinkSync(req.file.path);
      fs.writeFileSync(newPicturePath, picture);

      await conn.query(insertSql, insertValues);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createoperator,
  operatorLogin,
  operatorCompleteRegistration,
};
