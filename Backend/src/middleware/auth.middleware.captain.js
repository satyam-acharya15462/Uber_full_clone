import asyncHandler from "../utils/AsyncHandler.utils.js";
import ApiError from "../utils/ApiError.utils.js";

const auth_captain = asyncHandler(async (req , res , next)=>{
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

  if(!token){
    return res.status(402).json(new ApiError("the token is invalid or unauthorized" , 402))
  }

  
})