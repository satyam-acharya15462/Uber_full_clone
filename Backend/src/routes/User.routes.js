import express from "express"
const router = express.Router()
import { Register_User } from "../controllers/User.controller.js"
import {validationResult, body} from 'express-validator'

router.post("/register" , [
   body("email").isEmail().withMessage("invalid email"),
   body("fullName.firstName").isLength({min:3}).withMessage("the firstname should be at the very least 3 charecters"),
   body("fullName.lastName").isLength({min:3}).withMessage("the last name should be at the very least 3 charecter"),
   body("password").isLength({min:6}).withMessage("the password should be at the very least of 6 charecter")
],Register_User)

export {router}

