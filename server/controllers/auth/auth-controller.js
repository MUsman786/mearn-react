
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const Users = require('../../models/user')


//register

const registerUser = async(req,res)=>{
  const {userName,email,password}= req.body;
  try {
    
    const hashPassword= await bcrypt.hash(password,12)
    const newUser =await  new Users({
      userName,
      email,
      password:hashPassword
    })
    console.log(newUser)
    await newUser.save()
    res.status(200).json({
      success:true,
      message:("registration successfully")
    })
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0]; // Get the duplicate field (e.g., email or userName)
      let customMessage = `${duplicateField} already exists`;
      if (duplicateField === 'userName') {
        customMessage = "This username is already taken. Please choose a different one.";
    }
    if (duplicateField === 'email') {
      customMessage = "This email is already taken. Please choose a different one.";
  }
      res.status(400).json({
        success: false,
        message: customMessage,
      });
    } else {
      // Handle other errors
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Some error occurred',
        user:{
          email:checkUser.email,
          id:checkUser._id,
          role:checkUser.role
        }
      });
    }
  
  }

}






//login


const loginUser = async(req, res)=>{
  const {email,password}=req.body
  try {
    const checkUser = await Users.findOne({email})
    console.log(checkUser)
    if (!checkUser) return res.json({
      success: false,
      message: "User not found. Please register first",
    })
    const matchPassword = await bcrypt.compare(password,checkUser.password)
    if(!matchPassword) return res.json({
      success: false,
      message:"Invalid password. Please try again"
    })
    const token = jwt.sign({id:checkUser._id,email:checkUser.email,role:checkUser.role},process.env.SECRET_KEY,{expiresIn:'60m'})
    res.cookie('token',token,{http:true,secure:false}).json({
      success:true,
      message:"Logged in successfully",
      user:{
        name:checkUser.userName,
        email:checkUser.email,
        id:checkUser._id,
        role:checkUser.role
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Some error occured"
    })
  }
}






//logout


  //auth middleware



  module.exports={registerUser,loginUser}