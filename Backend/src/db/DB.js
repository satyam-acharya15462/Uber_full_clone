import mongoose from "mongoose"
import  MONGO_DB_NAME  from "../constant.js"
const connect_to_data_base =( async ()=>{
    try {
        const connection_instance = await mongoose.connect(`${process.env.MONGO_DB_URL}/${MONGO_DB_NAME}`)
        console.log(`the server is connect to the database:${connection_instance.connection.host}`)
    } catch (error) {
        console.log("somthing went wrong while connecting to the database" , error)
        throw error
    }
})

export default connect_to_data_base