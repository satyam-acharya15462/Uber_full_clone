import dotenv from "dotenv"
dotenv.config({
   path :"./.env"
})
import express from "express"
import cors from "cors"
import {router} from "../src/routes/User.routes.js"
import { Register_Captain } from "../src/controllers/captain.controller.js"
import cookie_parser from "cookie-parser"

const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie_parser())
app.use("/users/v3/api" , router)
app.use("/captain/v3/api" , Register_Captain)

// Global error handler for JSON parsing errors
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        console.error('JSON Parsing Error:', error.message);
        console.error('Request body:', req.body);
        return res.status(400).json({
            error: 'Invalid JSON format',
            message: 'Please check your JSON syntax. Make sure all property names are in double quotes.',
            details: error.message
        });
    }
    next(error);
});

export default app
