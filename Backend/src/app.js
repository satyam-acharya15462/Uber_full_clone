import dotenv from "dotenv"
dotenv.config({
   path :"./.env"
})
import express from "express"
import cors from "cors"
import {router} from "../src/routes/User.routes.js"

const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/users/v3/api" , router)

export default app