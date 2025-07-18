import {Captain} from "../models/captain.model.js";
import  ApiError  from "./ApiError.utils.js";

const CreateCaptain = async({email,firstname,lastname,password,colore,plate,capacity,vericle_type})=>{
   if ([email,firstname,lastname,password,colore,plate,vericle_type].some((values)=> typeof values !== String || values.trim() === "") || capacity > 1) {
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
            colore,
            vericle_type,
            plate,
            capacity
        }
    })

    return captain
}

export {CreateCaptain};
