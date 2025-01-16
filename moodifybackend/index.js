const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route= require('./src/routes');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", route);
mongoose.connect('mongodb+srv://gp0216716:functionUp%402023@cluster0.ylyfx9i.mongodb.net/').then(()=>console.log("database connected")).catch((err)=>console.log(err));   
app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})