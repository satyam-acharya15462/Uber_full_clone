import express from "express"
const router = express.Router()
import { Register_User , Login_User } from "../controllers/User.controller.js"
import {validationResult, body} from 'express-validator'

router
.route("/register")
.post([
   body("email").isEmail().withMessage("invalid email"),
   body("fullName.firstName").isLength({min:3}).withMessage("the firstname should be at the very least 3 charecters"),
   body("fullName.lastName").isLength({min:3}).withMessage("the last name should be at the very least 3 charecter"),
   body("password").isLength({min:6}).withMessage("the password should be at the very least of 6 charecter")
],Register_User)

router.route("/login").post([
   body("email").isEmail().withMessage("invalid Email"),
   body("password").isLength({min:6}).withMessage("the password should be at the very least of 6 charecter")
],Login_User)

router
.route("/profile")
.get()

export {router}

