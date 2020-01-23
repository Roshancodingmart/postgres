const conn = require("../db")
conn.client.connect(function(err) {
  if (err) console.log(err, "not connected");
  else console.log("Connected!");
});

const deleteUser = (req, res) => {
  const { d } = req.body;
  //   console.log("hi")
  //   console.log(d.id)
  conn.client.query(`DELETE FROM public.user WHERE id=${d.id}`, (error, res) => {
    if (error) {
      // console.log(error);
    } else {
      console.log(res);
      console.log("User deleted from the database");
    }
  });
};

module.exports = {
  deleteUser
};
