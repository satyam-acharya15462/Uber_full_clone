import { validationResult } from "express-validator";
import { CreateCaptain } from "../utils/CreateCaptain.utils.js";
import asyncHandler from "../utils/AsyncHandler.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import ApiError from "../utils/ApiError.utils.js";
import { Captain } from "../models/captain.model.js";
import BlackListToken from "../models/blackListToken.model.js";

const Register_Captain = asyncHandler(async(req,res,next)=>{
   // validating info comming from the body 
   const error = validationResult(req)
   if (!error.isEmpty()) {
      res.status(400).json(new ApiError("validation error" , error.array(), 400))
   }
   
   const {email , password , fullName , vehicle} = req.body
// hashing password

 const hashpassword = await Captain.hashPassword(password)

// creating the user model and creating and instance in the database

 const captain = await CreateCaptain({
    firstname : fullName.firstname,
    lastname : fullName.lastname,
    email,
    password:hashpassword,
   color : vehicle.color,
    capacity : vehicle.capacity,
    vehicle_type : vehicle.vehicle_type,
    plate:vehicle.plate
 })

 // creating the captain and removing the password to send the response to the user

  const create_captain = await Captain.findById((captain)._id).select("-password")

  if (!create_captain) {
     return res.status(500).json(new ApiError("somthing went wrong while registering the cptain",500))
  }

  // generating authentication Token 
  const Token = await create_captain.generateAuthenticationToken()
 
  // sending Response 

  res.status(200).json(new ApiResponse("the registration of the captain have been successfull" , [Token , create_captain], 200))
})

const Login_captain = asyncHandler(async(req  , res , next)=>{
   const {email , password} = req.body

   const error = validationResult(req)
   if(!error.isEmpty()){
     return res.status(400).json(new ApiError("the user deatail is not valid" , 400))
   }

   const captain = await Captain.findOne({email})

   if(!captain){
   return res.status(400).json(new ApiError("captain is not registerd in the data base", 400))
   }

   const compare_captain = await captain.comparePassword(password)

   if(!compare_captain){
      return res.status(400).json(new ApiError("the password of the captain is invalid" , 400))
   }

   const Token = await captain.generateAuthenticationToken()

   res.cookie('token' , Token)

   // Remove password from response
   const captainResponse = await Captain.findById(captain._id).select("-password")

   res.status(200).json(
      new ApiResponse("the captain has been login successfully" , [Token , captainResponse], 200, true)
   )
})


const captain_profile =asyncHandler( async (req ,res , next)=>{
   res.status(200).json(new ApiResponse(200 , req.captain , "the user profile have been created successfully" ))
})

const log_out_captain = asyncHandler(async (req , res , next) => {
   res.clearCookie("token");

   const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

   await BlackListToken.create({ token })

   res.status(200).json(new ApiResponse(200 , "the captain have been logout_successfully", true))
})

export {Register_Captain , Login_captain , captain_profile ,log_out_captain}
