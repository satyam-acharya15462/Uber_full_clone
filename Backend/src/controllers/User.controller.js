import User from "../models/User.models.js"
import  asyncHandler  from "../utils/AsyncHandler.utils.js"
import CreateUser from "../utils/CreateUser.utils.js"
import { validationResult } from "express-validator";

const Register_User =  asyncHandler(async (req , res , next)=>{
  const error = validationResult(req)
  if (!error.isEmpty()) {
   return res.status(400).res.json({error:error.array()})
  }
   
  const {firstName , lastName , email , password} = req.body

  const hashPassword = User.hashPassword(password);

  const user = await CreateUser({
    firstName,
    lastName,
    email,
    password : hashPassword
  })
  
  const Token = user.generateAuthenticationToken()

  res.status(200).json()

})


export {Register_User}