const User = require("../Model/userSchema");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if ((name == "" || email == "", password == ""))
      return res
        .status(400)
        .json({ message: "All fiend are required !", success: false });

    const isUser = await User.findOne({ email });

    if (isUser)
      return res
        .status(401)
        .json({ message: "User Already Exist !", success: false });

    const encryptedPassword = await bcrypt.hashSync(password);

    const newUser = await User({
      name,
      email,
      password: encryptedPassword,
    });

    await newUser.save();

    return res
      .status(200)
      .json({ message: "User Signup Successfully !", success: true, newUser });
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ message: "Faild to create user !", success: false });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ message: "User Not Found !", success: false });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res
        .status(400)
        .json({ message: "Wrong email or password !", success: false });

    const token = await JWT.sign({ user: user._id }, JWT_KEY, {
      expiresIn: "48h",
    });


    



    res.cookie("token", token);
    res
      .status(200)
      .json({ message: "User Login successfully !", success: true, token });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error in user Login !", success: false });
  }
};

const userLogout = async (req, res) => {
  await res.clearCookie("token");
  res
    .status(200)
    .json({ message: "User Logout Successfully !", success: true });
};

module.exports = { userSignup, userLogout, userLogin };
