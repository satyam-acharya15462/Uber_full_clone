import dotenv from "dotenv"
dotenv.config({
   path :"./.env"
})
import express from "express"
import cors from "cors"
import {router} from "../src/routes/User.routes.js"
import cookie_parser from "cookie-parser"

const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie_parser())
app.use("/users/v3/api" , router)


export default app