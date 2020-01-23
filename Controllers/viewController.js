const conn = require("../db")
conn.client.connect(function(err) {
  if (err) console.log(err, "not connected");
  else console.log("Connected!");
});
const viewUser=(req,res)=>{
   conn.client.query(`SELECT * FROM public.user ORDER BY id`,(error,resp)=>{
      let rows=resp.rows;
      console.log(rows)
      res.send(rows)
  })
  }
  module.exports = {
    viewUser
  };