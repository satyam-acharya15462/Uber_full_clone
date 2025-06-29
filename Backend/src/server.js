import http from "http"
import app from "./app.js"
import connect_to_data_base from "./db/DB.js"
import { error } from "console"


const server = http.createServer(app)

connect_to_data_base()
.then(()=>{
    server.listen(process.env.PORT || 8000 , ()=>{
        console.log(`server is running on port ${process.env.PORT || 8000}`)
    })
    server.on("error" , (error)=>{
       console.log("error" , error )
       throw error
    })
})
.catch((error)=>{
  console.log(`mongodb connection failed !!! ${error}`)
})
