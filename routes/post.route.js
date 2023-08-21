
const Router=require("express")
const { PostModel } = require("../models/post.model")

const postRouter=Router()


postRouter.post("/add",async(req,res)=>{
        const {userID}=req.body
        try {
            const post= new PostModel({...req.body,userID})
            await post.save()
            res.status(200).json({msg:"new post added"})
        } catch (error) {
            res.status(400).send({error:error.message})
        }
})



postRouter.get("/",async(req,res)=>{
    const {limit,pageno,min_comment,max_comment,device1,device2}=req.query
    const skip=(pageno-1)*limit
    const {userID}=req.body
    if(userID){
        query.userID=userID
    }
    // if(min_comment && max_comment){
    //     query.totalComments={

    //     }
    // }

    try {
        const posts= await PostModel.find(query)
        .skip(skip)
        .limit(limit)
        res.status(200).json({msg:"Posts",posts})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

postRouter.get("/top",async(req,res)=>{
    const {pageno}=req.query
    const limit=3
    const skip=(pageno-1)*limit

    try {
        const topPosts= await PostModel.find()
        .skip(skip)
        .limit(limit)
        res.status(200).json({msg:"top_posts"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

postRouter.patch("/update/:postID",async(req,res)=>{
    const {postID}=req.params
    const {userID}=req.body
    try {
        const post =await PostModel.findByIdAndUpdate({userID,_id:postID},req.body)
        if(!post){
            req.status(400).send({msg:"unable to find any post"})
        }else{
            res.status(200).send({msg:"post updated"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

postRouter.delete("/delete/:postID",async(req,res)=>{
    const {postID}=req.params
    const {userID}=req.body
    try {
        const post =await PostModel.findByIdAndDelete({userID,_id:postID},req.body)
        if(!post){
            req.status(400).send({msg:"unable to find any post"})
        }else{
            res.status(200).send({msg:"post Deleted successfully"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports={postRouter}