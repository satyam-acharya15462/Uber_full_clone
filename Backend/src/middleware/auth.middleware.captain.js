import asyncHandler from "../utils/AsyncHandler.utils.js";
import ApiError from "../utils/ApiError.utils.js";
import { Captain } from "../models/captain.model.js";
import jwt from "jsonwebtoken"

const auth_captain = asyncHandler(async (req , res , next)=>{
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

  if(!token){
    return res.status(402).json(new ApiError("the token is invalid or unauthorized" , 402))
  }

  const BlackListToken_captain = await Captain.findOne({
    token : token
  })
  
  try {
    if (BlackListToken_captain) {
      return res.status(402).json(new ApiError("unauthorized access" , 402))
    }

    const decode = jwt.verify(token , process.env.JWT_SECRET)
    const captain = await Captain.findById(decode._id);
    req.captain = captain
   return next()
  } catch (error) {
    return res.status(400).json(new ApiError(`some error has occure while authenticating the captain the following error is - ${error}`, 400))
  }
})

export default auth_captain