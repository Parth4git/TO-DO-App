import express from "express"
import useRouter from "./routes/user.route.js"
import taskRouter from "./routes/task.router.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.js";
import cors from "cors"


config({
    path:"./data/config.env"
})

export const app=express();

//all the middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[],
    credentials:true
}))
app.use( "/api/users",useRouter);
app.use( "/api/tasks",taskRouter);


app.get("/",(req,res)=>{
    res.send("hello js ")
})

app.use(errorHandler)

