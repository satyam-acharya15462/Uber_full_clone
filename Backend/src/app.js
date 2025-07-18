import dotenv from "dotenv"
dotenv.config({
   path :"./.env"
})
import express from "express"
import cors from "cors"
import user_routes from "../src/routes/User.routes.js"
import captain_routes from "../src/routes/captain.routes.js"
import cookie_parser from "cookie-parser"

const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie_parser())
app.use("/users/v3/api" , user_routes)
app.use("/captain/v3/api" ,captain_routes)


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
