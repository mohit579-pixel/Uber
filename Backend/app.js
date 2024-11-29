const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const connectToDb = require('./db/db');
const app=express();
const userRoutes=require('./routes/user.routes');

app.use(express.json());



connectToDb();
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('Hello Worls');
});

app.use('/users',userRoutes);


module.exports=app;

