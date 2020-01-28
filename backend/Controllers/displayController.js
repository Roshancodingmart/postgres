const conn = require("../db");

const displayTable = (req, res) => {
    const i =req.body;
    // console.log(req.body)
    // console.log(i.j.a)
  conn.client.query(
    `SELECT * FROM public.image WHERE id=$1`,[i.j.a],
    (error, resp) => {
        // console.log(resp)
      let rows = resp.rows;
      // console.log(rows[0])
      res.send(rows[0]);
    }
  );
};
module.exports = {
  displayTable
};
