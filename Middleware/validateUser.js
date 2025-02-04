const JWT  = require("jsonwebtoken");
require('dotenv').config();
const JWT_KEY = process.env.JWT_KEY

const isValidUser = async (req,res,next)=>{

    // const token = req.cookies.token;
    const token = req.cookies.token;
    try {

        if(!token) return   res.json({message:"User validation faild !"});

        const decoded = await JWT.verify(token,JWT_KEY);

        const id = decoded.user;

        req.user = id;

       next()
        
    } catch (error) {
        console.log(error);
        res.json({message:"User Validation error !",success:false});
        
    }
}


module.exports = isValidUser