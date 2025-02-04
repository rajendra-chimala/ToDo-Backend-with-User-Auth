const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;
const DB_Connection = async () =>{

    await mongoose.connect(DB_URL).then(()=>{
        console.log("Database Connection Successfully !");
    }).catch((err)=>{
        console.log("Faild to Database Connection !",err);

    })

}


module.exports = DB_Connection