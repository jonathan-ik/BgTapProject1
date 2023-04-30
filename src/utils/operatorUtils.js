const pool = require("../db");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { requiredKeysValidator } = require("./uservalidation");

const registion_id = (req) => {
  return new Promise((resolve, reject) => {
    try {
      const jwtToken = req.headers.authorization;
      const decodedToken = jwt.decode(jwtToken);
      console.log(decodedToken);
      const reg_id = parseInt(decodedToken.reg_id);
      resolve(reg_id);
    } catch (error) {
      reject(error);
    }
  });
};

// Validate user country
const userNationality = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let { nationality } = req.body;
      nationality = nationality.toLowerCase().trim();
      if (nationality !== "nigerian") {
        reject(
          "We're sorry, our services are only available in Nigeria at the moment"
        );
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// validate user state

const userState = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { state } = req.body;
      state =
        state.trim().charAt(0).toUpperCase() + state.slice(1).toLowerCase();
      const conn = await pool.connect();

      const stateQuery = 'SELECT * FROM "states" WHERE state = $1';
      const values = [state];
      const result = await pool.query(stateQuery, values);

      const foundState = result.rows[0];
      conn.release();

      if (!foundState) {
        reject("Please enter a valid state");
      }
      const stateId = foundState.state_id;
      console.log(stateId);

      resolve(stateId);
    } catch (error) {
      reject(error);
    }
  });
};

const userLga = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { lga } = req.body;
      const LGAname =
        lga.trim().charAt(0).toUpperCase() + lga.slice(1).toLowerCase();
      const stateID = await userState(req);
      console.log(stateID);
      const stateId = stateID.toString();
      const conn = await pool.connect();

      const lgaQuery = 'SELECT * FROM "lgas" WHERE lga = $1';
      const values = [LGAname];
      const result = await pool.query(lgaQuery, values);
      const foundlGA = result.rows;
      conn.release();

      if (foundlGA.length === 0) {
        reject(new Error("Please enter a valid Local Government"));
      }

      const lgaStateID = foundlGA[0].state_id.toString();

      if (!(stateId === lgaStateID)) {
        reject(
          new Error("Local Government selected doesn't exist in your state")
        );
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const operatorValidation = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
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

      // List of required keys
      const Keys = [
        "firstname",
        "lastname",
        "phonenumber",
        "nationality",
        "state",
        "lga",
        "sex",
        "dateofbirth",
        "nin",
      ];

      // // List of allowed image types
      const ImageTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

      // Validate that all required keys are present in the request body
      await requiredKeysValidator(req, Keys);

      // Regular expressions to validate phone number and NIN
      const phonePattern = /^((\+234)|234|0)[78901]\d{9}$/;
      const ninPattern = /^\d{11}$/;

      // Check that all required fields are not empty
      if (
        !(
          firstname.trim() &&
          lastname.trim() &&
          phonenumber.trim() &&
          nationality.trim() &&
          state.trim() &&
          lga.trim() &&
          sex.trim() &&
          dateofbirth.trim() &&
          nin.trim()
        )
      ) {
        reject(
          "firstname, lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin and picture must be provided"
        );
      } else if (!ImageTypes.includes(req.file.mimetype)) {
        reject("Upload an image as picture");
      } else if (!phonePattern.test(phonenumber)) {
        // Check that phone number is valid
        reject("Phone number not valid");
      } else if (!["male", "female"].includes(sex.toLowerCase())) {
        // Check that sex is either "Male" or "Female"
        reject("Sex must either be male or female");
      } else if (!moment(dateofbirth, "YYYY-MM-DD", true).isValid()) {
        // Check that date of birth is in the format "YYYY-MM-DD"
        reject("Enter Date of Birth format in YYYY-MM-DD");
      } else if (!ninPattern.test(nin)) {
        // Check that NIN is valid
        reject("Invalid NIN");
      } else {
        // All validation checks passed
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  userNationality,
  userState,
  userLga,
  operatorValidation,
  registion_id,
};
