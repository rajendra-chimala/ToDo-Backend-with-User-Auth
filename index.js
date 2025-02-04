const express = require('express');
require('dotenv').config();
const DB_Connection =require('./DB/dbConnection');
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');
const app = express();

DB_Connection();


app.get('/',(req,res)=>{
    res.end("Server is running !");
})


app.use(cookieParser());

app.use(express.json());
app.use('/user',require('./Router/userRouter'));
app.use('/todo',require('./Router/todoRouter'));



app.listen(PORT, ()=>{
    console.log(`Server is Running [${PORT}]`)
})