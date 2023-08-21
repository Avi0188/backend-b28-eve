const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")
const {Router}=require("express")
const { UserModel } = require("../models/users.model")
const BlacklistModel = require("../models/blacklist.model")



const userRouter=Router()


// for registeration
userRouter.post("/register",async(req,res)=>{

    try {
        const email=req.body.email
        const user=await UserModel.findOne({email})
        if(user){
            // if that email present it means user is already registered
            res.status(400).json({msg:"User Already Registered"})
        }else{
              bcrypt.hash(req.body.password,10,async(error,hash)=>{
                if(hash){
                    const newUser=new UserModel({...req.body,password:hash})
                    await newUser.save()
                    res.status(200).json({msg:"User Registered Successfully"})
                }
              })
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


// for login

userRouter.post("/login",async(req,res)=>{
const {email,password}=req.body
    try {
    const user= await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(error,result)=>{
            if(result){
                const token=jwt.sign({userID:user._id},"masai")
                res.status(200).json({msg:"User Logged in Successfully"})
            }else{
                res.status.json({msg:"wrong credential"})
            }
        })
    }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

// for logout
userRouter.post("/logout",async(req,res)=>{
        try {
        const token=req.headers.authorization?.split(" ")[1]||null
        if(token){
            await BlacklistModel.updateMany({},{$push:{blacklist:[token]}})
            res.status(200).send({msg:"Logout Succssfully"})
        }
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    })


module.exports={userRouter}