const cors=require("cors")
const express=require("express")
const {connection}=require("./config/db")
const { userRouter } = require("./routes/user.route")
const { postRouter } = require("./routes/post.route")
const {auth}=require("./middlewares/auth.middleware")
const app=express()

app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use("/posts",postRouter)
app.listen(8000,async()=>{
    try {
        await connection
        console.log("connected to mongodb")
        console.log("port 8000 is running")
    } catch (error) {
        console.log(error.message)
    }
})