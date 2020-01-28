const conn = require("../db")

const createUser=(req,res)=>{
    const{b}=req.body;
    // console.log(b.id,b.name,b.pass)
    conn.client.query(`INSERT INTO public.user(id,username,password) VALUES ($1 , $2 , $3)`,[b.id,b.name,b.pass],(error,res)=>{
        if(error){
            // console.log(error)
        }
       else{
           console.log(res)
          console.log("User added to database")
       }
    })
}
module.exports={
    createUser
}