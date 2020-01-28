 const conn = require("../db");

const insertImage = (req, res) => {
    // console.log(req.body)
    const y=req.body
    // console.log(y.z.url)
  conn.client.query(
    `INSERT INTO public.image (id,url,bol) VALUES ($1 , $2 , $3)`,[y.z.ide,y.z.url,y.z.bol],
    (error, resp) => {
        console.log("Insertion Successful")
    // console.log(error,resp)
    }
  );
};
module.exports = {
    insertImage
};
