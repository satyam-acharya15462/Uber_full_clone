import {User} from "../models/User.models.js";
import  asyncHandler  from "../utils/AsyncHandler.utils.js";
import CreateUser from "../utils/CreateUser.utils.js";
import { validationResult } from "express-validator";
import ApiResponse from "../utils/ApiResponse.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";


const Register_User =  asyncHandler(async (req , res , next)=>{
  const error = validationResult(req)
  if (!error.isEmpty()) {
  return res.status(400).json({error:error.array()})
  }
   
  const {fullName , email , password} = req.body

   

  const user = await CreateUser({
    firstName : fullName.firstName,
    lastName : fullName.lastName,
    email,
    password 
  })

  const create_User = await User.findById((user)._id).select(
    "-password"
  )
  
if(!create_User){
  throw new ApiError("while registering a user somthing went worng" , 500);
}

const Token = create_User.generateAuthenticationToken()

  res.status(200).json(
    new ApiResponse(200,[Token,create_User],"the user has been successfully registerd in the database")
  )

})


export {Register_User}