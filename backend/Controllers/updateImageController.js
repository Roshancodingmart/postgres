const conn = require("../db");

const updateImage = (req, res) => {
  // console.log(req.body)
  const y = req.body;
  console.log(y.j.url)
  console.log(y.j.id)
  conn.client.query(
    `UPDATE public.image SET url=$1 where id=$2`,[y.j.url,y.j.a],
    (error, resp) => {
    //   let rows = resp.rows;
    console.log("updated")
      console.log(resp);
    //   res.send(rows);
    }
  );
};
module.exports = {
  updateImage
};
