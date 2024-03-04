
class ErrorHandeler extends Error{
  constructor(message,statusCode){
    super(message);
    this.statusCode=statusCode
  }
}

export const errorHandler=(err,req,res,next)=>{

  err.message=err.message||"internal server error";
  err.statusCode=err.statusCode||500;

   return res.status(err.statusCode).json({
 sucess:false,
 message:err.message
   });
    };

    export default ErrorHandeler