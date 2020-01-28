const conn = require("../db")

const deleteUser = (req, res) => {
  const { d } = req.body;
  //   console.log("hi")
  //   console.log(d.id)
 
  conn.client.query(`DELETE FROM public.user WHERE id=${d.id}`, (error, res) => {
    if (error) {
      // console.log(error);
    } else {
      // console.log(res);
      console.log("User deleted from the database");
    }
  }); 
  conn.client.query(`DELETE FROM public.image WHERE id=${d.id}`, (error, res) => {
    if (error) {
      // console.log(error);
    } else {
      // console.log(res);
      console.log("User deleted from the database");
    }
  });
};

module.exports = {
  deleteUser
};
