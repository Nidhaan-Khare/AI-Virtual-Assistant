import express from "express";
import { Login, signUp, logOut } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup",signUp);
authRouter.post("/signin",Login);
authRouter.get("/logout",logOut);

export default authRouter;