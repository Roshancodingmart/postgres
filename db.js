const Client = require('pg').Client
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '123',
  port: 5432,   
})
module.exports={
    client
}
