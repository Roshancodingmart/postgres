const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3005;
const Client = require('pg').Client
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '123',
  port: 5432,   
})
client.connect(function (err){
    if(err)
        console.log(err,"not connected");
    else
        console.log("Connected!");
});
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
  
)
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  next();
});
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })


  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  app.post('/createUser',(req,res)=>{
      const{b}=req.body;
      console.log(b.id,b.name,b.pass)
      client.query(`INSERT INTO public.user(id,username,password) VALUES ($1 , $2 , $3)`,[b.id,b.name,b.pass],(error,res)=>{
          if(error){
              console.log(error)
          }
         else{
             console.log(res)
            console.log("User added to database")
         }
      })
  })
  app.post('/deleteUser',(req,res)=>{
      const {d}=req.body;
    //   console.log("hi")
    //   console.log(d.id)
      client.query(`DELETE FROM public.user WHERE id=${d.id}`,(error,res)=>{
        if(error){
            console.log(error)
        }
       else{
           console.log(res)
          console.log("User deleted from the database")
       }
      })
  })
  
  app.post('/updateUser',(req,res)=>{
      const {b}=req.body;
      client.query(`UPDATE public.user SET username=$1 ,password=$2 where id=${b.id}`,[b.name,b.pass],(error,res)=>{
        if(error){
            console.log(error)
        }
       else{
           console.log(res)
          console.log("User updated")
       }
      })
  })
  app.post('/viewUser',(req,res)=>{
    client.query(`SELECT * FROM public.user ORDER BY username`,(error,resp)=>{
      let rows=resp.rows;
      console.log(rows)
      res.send(rows)
  })
})