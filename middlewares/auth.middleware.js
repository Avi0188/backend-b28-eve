const jwt= require("jsonwebtoken");
const BlacklistModel = require("../models/blacklist.model");

const auth=async(req,res,next)=>{
    const token=req.headers.authorization.split("")[1];
    try {
        let existingToken=await BlacklistModel.find({blacklist:{$include:token}})

        if(existingToken){
            res.status(200).send("login again")
        }
        else{
            const decoded=jwt.verify(token,"masai")
            req.body.userID=decoded.userID
            next()
        }
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

module.exports={auth}