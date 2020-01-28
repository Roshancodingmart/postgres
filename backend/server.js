const db = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3005;
const addRoute = require("./Routes/addRoute");
const deleteRoute = require("./Routes/deleteRoute");
const updateRoute = require("./Routes/updateRoute");
const viewRoute = require("./Routes/viewRoute");
const tableRoute = require("./Routes/tableRoute");
const signinRoute = require("./Routes/signinRoute");
const imageRoute = require("./Routes/imageRoute");
const createRoute = require("./Routes/createRoute");
const displayRoute = require("./Routes/displayRoute");
// const checkRoute = require("./Routes/checkRoute");
const updateImageRoute = require("./Routes/updateImageRoute")

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );
  next();
});
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
// app.post('/createUser',db.createUser)
// app.post('/deleteUser',db.deleteUser)
// app.post('/updateUser',db.updateUser)
// app.post('/viewUser',db.viewUser)
app.use("/createUser", addRoute);
app.use("/deleteUser", deleteRoute);
app.use("/updateUser", updateRoute);
app.use("/viewUser",viewRoute);
app.use("/tableUser",tableRoute);
app.use("/signinUser",signinRoute);
app.use("/insertImage",imageRoute);
app.use("/createTable",createRoute);
app.use("/displayTable",displayRoute);
app.use("/updateImage",updateImageRoute);
// addRoute.use("/checkUser",checkRoute);