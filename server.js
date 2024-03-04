import {app} from "./app.js"
import connectDB from "./data/connectToMongoDB.js"


connectDB();

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 5000")
})