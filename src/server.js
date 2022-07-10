require('dotenv').config();
require("./databases/mongodb");

const port      = process.env.PORT || 8000;
const express   = require("express");
const app       = express();
const fileUpload= require("express-fileupload");

app.use(fileUpload());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/", require("./app/routes"));

app.listen(port, ()=>{
    console.log("server runing with: http://localhost:"+port);
});