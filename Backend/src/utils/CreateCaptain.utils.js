import {Captain} from "../models/captain.model.js";
import  ApiError  from "./ApiError.utils.js";

const CreateCaptain = async({email,firstname,lastname,password,color,plate,capacity,vehicle_type})=>{
   console.log('CreateCaptain received:', {email,firstname,lastname,password,color,plate,capacity,vehicle_type});
   console.log('Types:', {
      email: typeof email,
      firstname: typeof firstname,
      lastname: typeof lastname,
      password: typeof password,
      color: typeof color,
      plate: typeof plate,
      capacity: typeof capacity,
      vehicle_type: typeof vehicle_type
   });
   
   if ([email,firstname,lastname,password,color,plate,vehicle_type].some((values)=> typeof values !== "string" || values.trim() === "") || capacity < 1) {
      throw new ApiError("all fields are required and is needed to be written correctly")
   }

    const exsisting_captain = await Captain.findOne({email})

    if (exsisting_captain) {
        throw ApiError("the captain already exsists in the database" , "401")
    }
  
    const captain = await Captain.create({
        fullName:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            vehicle_type,
            plate,
            capacity
        }
    })

    return captain
}

export {CreateCaptain};
