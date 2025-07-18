class ApiError extends Error{
    constructor(
         message = "somthing went wrong",
         statuscode, 
         stack = "",
         errors = []
    ){
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.message = message
        this.success= false
        this.errors = errors

        if(stack){
          this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export default ApiError