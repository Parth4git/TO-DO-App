import express from "express";
import {createNewUser,getMyProfile,loginUser,logOut} from "../controller/user.contoller.js"
import {isAuthenticated} from "../middleware/auth.js";
const router =express.Router();

router.get("/login", loginUser);

router.get("/logout",logOut);

router.post("/new", createNewUser);

router.get("/me",isAuthenticated,getMyProfile);

export default router;