function asyncHandler(requesrhandler){
    return function (req,res,next){
       Promise.resolve(requesrhandler(req,res,next))
       .catch((err)=>next(err))
    }
}

export default asyncHandler