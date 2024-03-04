import mongoose from "mongoose";

  const connectDB=()=>
{mongoose.connect(process.env.MONGO_URI,{
    dbName:"api_testing"
}).then(() => {
 console.log("connected to db");   
}).catch((err) => {
   console.log(err) 
})};

export default connectDB;