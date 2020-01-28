const conn = require("../db");

const createTable = (req, res) => {
    const{y}=req.body;
  conn.client.query(
    `CREATE TABLE $1 (
        url text NOT NULL
        );`,[y.id],
    (error, resp) => {
    //   let rows = resp.rows;
      console.log("Table created");
    //   res.send(rows);
    }
  );
};
module.exports = {
  createTable
};
