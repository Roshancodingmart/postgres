const conn = require("../db");

const tableUser = (req, res) => {
  const count = req.body.count;
  console.log("count",count)
  conn.client.query(
    `SELECT
   id,
   username,password
FROM
   public.user
ORDER BY
   id 
FETCH FIRST $1 ROW ONLY; `,[count],
    (error, resp) => {
      let rows = resp.rows;
      // console.log(rows);
      res.send(rows);
    }
  );
};
module.exports = {
  tableUser
};
