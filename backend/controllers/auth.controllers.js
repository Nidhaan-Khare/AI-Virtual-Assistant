import User from "../models/user.model.js";
import bcrypt, { hash } from "bcryptjs";
import getToken from "../config/token.js";

export const signUp = async (req,res)=>{
    try {
        // console.log("reached");
        const{name, email, password}=req.body;
        const existEmail= await User.findOne({email});
        if(existEmail){
            return res.status(400).json({message:"email already exist!!"});
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be of atleast 6 characters !!"});
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const user= await User.create({
            name:name, password:hashedPassword, email:email
        });
        
        const token = await getToken(user._id);

        res.cookie("token",token , {httpOnly:true, maxAge: 7*24*60*60*1000, sameSite: "strict", secure: false});
        // console.log(user);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({message:`sign up error -> ${error}`});
    }
}


export const Login = async (req,res)=>{
    try {
        const{email, password}=req.body;
        const user= await User.findOne({email});
        // console.log(user);
        
        if(!user){
            return res.status(400).json({message:"email does not exist!!"});
        }

        const isMatch= await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message:"Incorrect password!!"});
        }

        const token = await getToken(user._id);

        res.cookie("token",token , {httpOnly:true, maxAge: 7*24*60*60*1000, sameSite: "strict", secure: false});
        
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message:`Login error -> ${error}`});
    }
}

export const logOut = async (req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({message:`Logout successfully`});
    } catch (error) {
        return res.status(500).json({message:`Logout error -> ${error}`});
    }
}