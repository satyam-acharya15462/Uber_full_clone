import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const captainSchema = new mongoose.Schema({
    fullName: {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },


    password: {
        type: String,
        required: true,
    },

 
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'banned'],
        default: 'inactive',
    },

    socketId: {
        type: String,
    },

  vehicle:{
    color:{
        required:true,
        type:String,
        minlength:[3,"the color must be at least three charecter long"]
    },
    plate:{
        type:String,
        required:true,
        minlength:[3,"the number plate should be at least three charecter long"]
    },
    capacity:{
        type:Number,
        required:true,
        minlength:[2,"the capacity should be at the very least of 2 people"]
    },

    vehicle_type:{
        type:String,
        required:true,
        enum: ["car", "bike", "van", "bus" , "auto rickshaw"],
    }
  },

  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
}, { timestamps: true }); 

captainSchema.methods.generateAuthenticationToken = function() {
    const token = jwt.sign(
      { _id: this._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}   


export const Captain = mongoose.model('Captain', captainSchema);

