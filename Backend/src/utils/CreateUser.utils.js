import { User} from "../models/User.models";
import { ApiError } from "./ApiError.utils";

CreateUser = async({email, firstName , lastName ,password})=>{
    if ([email,firstName,lastName,password].some((files)=>(files.trim() === ""))) {
        throw new ApiError("please enter the required filed , the fields are invalid",404);
    }

    const user = User.create({
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