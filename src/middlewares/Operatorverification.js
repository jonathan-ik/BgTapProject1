const pool = require("../db");
const { registion_id } = require("../utils/operatorUtils");

const operatorVerificationStatus = async (req, res, next) => {
  let conn; // declare conn outside of the try block

  try {
    const reg_id = await registion_id(req);
    // console.log(reg_id);
    conn = await pool.connect();
    const sql = "SELECT * from operator_profile where reg_id =($1);";
    const result = await conn.query(sql, [reg_id]);
    const operator = result.rows[0];
    req.operator = operator;
    if (operator) {
      if (operator.isverified) {
        next();
      } else {
        res.status(401).json("your operator Account is not yet verified ");
      }
    } else {
      res.status(401).json("Unauthorized access. contact Admin");
    }
  } catch (error) {
    res.status(401).json(`Error verifying operator status: ${error}`);
  } finally {
    // call conn.release() only if conn is defined
    if (conn) {
      conn.release();
    }
  }
};

module.exports = operatorVerificationStatus;
