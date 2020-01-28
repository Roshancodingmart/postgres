// const conn = require("../db");

// const checkUser = (req, res) => {
//   // console.log(req.body)
//   const { y } = req.body;
//   // console.log(y.z.url)
//   conn.client.query(
//     `SELECT * FROM public.user WHERE id=$1`,
//     [y.id],
//     (error, resp) => {
//       let rows = resp.rows;
//       console.log(rows);
//       res.send(rows);
//     }
//   );
// };
// module.exports = {
//   checkUser
// };
