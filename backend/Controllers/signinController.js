const conn = require("../db")

const signinUser=(req,res)=>{
    const{b}=req.body;

    conn.client.query(`SELECT * FROM public.user WHERE id=$1` ,[b.id],(err,resp)=>{
        let rows=resp.rows
        res.send(rows);
    })
}
module.exports={
    signinUser
}