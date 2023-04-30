const pool = require("../db");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const uservalidation = require("../utils/uservalidation");

dotenv.config();

const createUser = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validate = await uservalidation.validateUserReg(req);
      const conn = await pool.connect();
      const sql = `INSERT INTO users(
                    email, password)
                    VALUES ($1, $2)
                    RETURNING *;`;

      const hashPassword = bcrypt.hashSync(
        req.body.password + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS)
      );

      const values = [req.body.email, hashPassword];
      const result = await conn.query(sql, values);
      conn.release();

      resolve(result.rows[0]);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * from users;";
      const result = await conn.query(sql);
      const rows = result.rows;
      conn.release();
      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
};

const userLogin = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const requiredKeys = ["email", "password"];
      uservalidation.requiredKeysValidator(req, requiredKeys);

      const { email, password } = req.body;

      const conn = await pool.connect();
      const result = await conn.query(
        "SELECT user_id, password from users where email = $1;",
        [email]
      );
      const rows = result.rows;
      conn.release();

      if (rows.length > 0) {
        const matchPassword = await bcrypt.compare(
          password + process.env.BCRYPT_PASSWORD,
          rows[0].password
        );
        if (matchPassword) {
          resolve(`${rows[0].user_id}`);
        } else {
          reject("email and/or password do not match");
        }
      } else {
        reject("Invalid User");
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { userLogin, createUser, getAllUsers };
