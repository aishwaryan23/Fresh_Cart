// Register User

import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        
        if(!name || !email ||!password){
            return res.json({
                success : false,
                message: "Please fill all the fields"
            })
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.json({
                success : false,
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({name, email, password: hashedPassword})

        const token = jwt.sign({ id : user._id},process.env.JWT_SECRET, {expiresIn : '7d'});

        res.cookie('token' , token, {
            httpOnly : true, //Prevent javascript to access cookie
            secure : process.env.NODE_ENV === 'production', //USE SECURE COOKIE IN PRODUCTION
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict', //Prevent CSRF
            maxAge : 7 * 24 * 60 * 60 * 1000 //7 days
         })

        return res.json({
            success : true,
            user : {email: user.email, name : user.name}})
    }catch(error){
        console.log(error.message);
        res.json({success : false, message: error.message})
    }
}


//Login User: /api/user/login

export const login = async (req, res)=> {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({success:false,message:"Please enter your credentials"})
        }
        const user = await User.findOne({email});

        if(!user){
            return res.json({success:false,message:"Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }
        const token = jwt.sign({ id : user._id},process.env.JWT_SECRET, {expiresIn : '7d'});

        res.cookie('token' , token, {
            httpOnly : true, //Prevent javascript to access cookie
            secure : process.env.NODE_ENV === 'production', //USE SECURE COOKIE IN PRODUCTION
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict', //Prevent CSRF
            maxAge : 7 * 24 * 60 * 60 * 1000 //7 days
         })

        return res.json({
            success : true,
            user : {email: user.email, name : user.name}})
    }catch(error){
        console.log(error.message);
        res.json({success : false, message: error.message});
    }
}

// Check Authenticated User: /api/user/is-auth

export const isAuth = async (req,res)=>{
    try{
        const {userId} = req.body;
        const user = await User.findById(userId).select("-password");
        return res.json({success:true,user});
    }catch(error){
        console.log(error.message);
        res.json({success : false, message: error.message});
    }
}

//logout user: /api/user/logout
export const logout = async (req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({success:true,message:'Logged out successfully'})
    }catch(error){
        console.log(error.message);
        res.json({success : false, message: error.message});
    }
}