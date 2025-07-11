import { User } from "../models/User.models.js";
import  bcrypt from "bcrypt"
import asyncHandler from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import jwt from "jsonwebtoken"

const auth_User = asyncHandler(async(req , res , next )=>{
   const token = req.cookies.token || req.headers.authorization.split(" ")[1];
   if (!token) {
     return res.status(402).json(new ApiError(400 , "Access denied as token was inavilable"))
   }
   try {
    const decode = jwt.verify(token , process.env.JWT_SECRET);
    const user = await User.findById(decode._id)
    req.user = user 
   return  next()
   } catch (err) {
    return res.status(401).json(new ApiError(402 , "unauthorized access"))
   }
})


export default auth_User

