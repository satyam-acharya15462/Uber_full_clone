import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
  fullName:{
    firstName:{
        type:String,
        required:true,
        minlength:[3,"the firstname should be at the verleast 3 charecter"]
    },
    lastName:{
        type:String,
        required:true,
        minlength:[3,`the last name should be at the very least 3 charecter`]
    },
  },

  email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,"the email should be at the verleast 3 charecter"]
  },

  password:{
    type:String,
    require:true,
    select:false,
    minlength:[6,"the password must be six charecter long"]
  },

  socketId:{
    type:String
  }

},{timestamps:true})



UserSchema.methods.generateAuthenticationToken = function() {
    const Token = jwt.sign(
      { _id: this._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )
    return Token
}

UserSchema.methods.ComparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password , 10);
}

export const User  = mongoose.model("User" , UserSchema)

