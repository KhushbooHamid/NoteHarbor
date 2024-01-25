const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Harryisagoodb$oy";

//create a doctor using: POST 

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user exists with the same email already

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10); //await because this fxn genSalt returns promise and waits till value gets transferred into const salt.
      secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
         user:{
         id : user.id
         }
      }
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({authToken})
      // res.json(user);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Authenticate a user using post request
router.post(
   "/loginuser",
   [
     body("email", "Enter a valid email").isEmail(),
     body("password", "Password cannot be blank").exists()
     
   ],
   async (req, res) => {
    let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {email, password} = req.body;
      try{
         let user = await User.findOne({email});
         success=false
         if(!user){
            return res.status(400).json({ success, error: "Please try to login with correct credentials"});
         }

         const passwordCompare = await bcrypt.compare(password, user.password); 
         if(!passwordCompare){
          success=false
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
         }

         const data = {
            user:{
            id : user.id
            }
         }
         const authToken = jwt.sign(data, JWT_SECRET);
         success = true;
         res.json({success, authToken})


      }catch(error) {
         console.error(error.message);
         res.status(500).send("Internal server error");
      }
   })


// get details of logged in user
router.post("/getuser",  fetchuser,  async (req, res) => {

try{
  userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
}catch(error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
  })


module.exports = router;
