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

   const hashpassword = await User.hashPassword(password)

  const user = await CreateUser({
    firstName : fullName.firstName,
    lastName : fullName.lastName,
    email,
    password : hashpassword
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


const Login_User = asyncHandler(async (req,res,next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json(new ApiError(400 , error.array(), "the user have writen the password or email incorrectly" , {error:error.array()}))
    }

    const {email , password} = req.body

    const Find_user = await User.findOne({email}).select("+password")

   if (!Find_user) {
      return res.status(401).json(new ApiError(401 , "maybe invalid email or Password"))
   }
   
   const user_is_match = await Find_user.ComparePassword(password)
   
   if (!user_is_match) {
      return res.status(400).json(new ApiError(400 , "the user password or email is wrong please try again"))
   }

   const Token = await Find_user.generateAuthenticationToken()

   res.status(200).json(new ApiResponse(200 , [Token , Find_user] , "the user have been logind successfully"))
    
})


export {Register_User , Login_User}