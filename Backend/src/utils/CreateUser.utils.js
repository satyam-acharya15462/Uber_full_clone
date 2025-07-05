import { User} from "../models/User.models.js";
import { ApiError } from "./ApiError.utils.js";

const CreateUser = async({email, firstName , lastName ,password})=>{
    if ([email, firstName, lastName, password].some((field) => typeof field !== "string" || field.trim() === "")) {
        throw new ApiError("please enter the required field, the fields are invalid", 404);
    }

    const exsisting_user = await User.findOne({
        $or : [{email}, {firstName} ,{lastName}]
    })

    if(exsisting_user){
        throw new ApiError("the user already exsists in the database",400);
    }


    const user = await User.create({
        fullName:{
           firstName,
           lastName
        },
        password,
        email,
    })


    return user
}

export default CreateUser