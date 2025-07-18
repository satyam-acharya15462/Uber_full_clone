import { validationResult } from "express-validator";
import { CreateCaptain } from "../utils/CreateCaptain.utils.js";
import asyncHandler from "../utils/AsyncHandler.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import ApiError from "../utils/ApiError.utils.js";
import { Captain } from "../models/captain.model.js";

const Register_Captain = asyncHandler(async(req,res,next)=>{
   const {email , password , fullName , vericle} = req.body
 // validating info comming from the body 
   const error = validationResult(req)
   if (!error.isEmpty()) {
      res.status(404).json(new ApiError("validation error" , error.array(), 400))
   }
 // hashing password

 const hashpassword = await Captain.hashpassword(password)

 // creating the user model and creating and instance in the database

 const captain = await CreateCaptain({
    firstname : fullName.firstname,
    lastname : fullName.lastname,
    email,
    password:hashpassword,
    colore : vericle.colore,
    capacity : vericle.capacity,
    vericle_type : vericle.vericle_type,
    plate:vericle.plate
 })

 // creating the captain and removing the password to send the response to the user

  const create_captain = await Captain.findById((captain)._id).select("-password")

  if (!create_captain) {
     throw new ApiError("somthing went wrong while registering the cptain",500)
  }

  // generating authentication Token 
  const Token = await Captain.generateAuthenticationToken()
 
  // sending Response 

  res.status(200).json(new ApiResponse("the registration of the captain have been successfull" , [Token , create_captain], 200))
})

const Login_captain = asyncHandler(async()=>{
   const {email , password} = req.body

   const error = validationResult(req)
   if(!error.isEmpty()){
      res.status(400).json(new ApiError("the user deatail is not valid" , 400))
   }

   const captain = await Captain.findOne({email}).select("-Password")

   if(!captain){
      res.status(400).json("captain is not registerd in the data base", 400)
   }

   
})

export {Register_Captain}
