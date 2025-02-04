const express = require('express');

const router = express.Router();
const {userSignup,userLogin, userLogout} = require("../Controller/userController")

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.get('/logout',userLogout);



module.exports = router