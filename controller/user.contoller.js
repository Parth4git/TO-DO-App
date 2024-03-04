import User from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie} from "../utis/feature.js";
import ErrorHandeler from "../middleware/error.js";

const loginUser =async (req,res,next) => {
    try {
        const {email,password}=req.body;
    const user= await User.findOne({email}).select("+password");
    if(!user) return (new ErrorHandeler("Invalid email or password",400));
    
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({
            sucess:false,
            message:"password or email is incorrect"});
        
        sendCookie(user,res,`login sucessfully,${user.name}`,200)
    } catch (error) {
        next(error)
    }


}
 const createNewUser= async (req,res,next)=>{
   try {
     const{name,email,password}=req.body;

    let user =await User.findOne({email});
    if(user) return(new ErrorHandeler("user already exists",400))
      
        const hashedPassword =await bcrypt.hash(password,10);

       user= await User.create({name,email,password:hashedPassword})

       sendCookie(user,res,"registered sucessfully",201)
   } catch (error) {
    next(error)
   }
}
 const getMyProfile =async (req,res)=>{
   
    res.status(200).json({
        sucess:true,
        user:req.user
    })
}

export const logOut = (req,res)=>{
    res.status(200).cookie("token","",{
    sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
            secure:process.env.NODE_ENV==="Development"?false:true},
    {expires:new Date(Date.now())}).json({
        sucess:true,
        user:req.user
    })
}

export {createNewUser,loginUser,getMyProfile}