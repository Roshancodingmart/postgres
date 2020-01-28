const conn = require("../db")

const updateUser=(req,res)=>{
    const {b}=req.body;
    conn.client.query(`UPDATE public.user SET username=$1 ,password=$2 where id=${b.id}`,[b.name,b.pass],(error,res)=>{
      if(error){
          // console.log(error)
      }
     else{
        //  console.log(res)
        console.log("User updated")
     }
    })
}
module.exports = {
    updateUser
  };
  