import mongoose from "mongoose";
import { CommentSchema } from "./comments.model.js";


const postSchema = new mongoose.Schema({
    Title: String,
    text: String,
    status:{
        type:String,
        enum:["Privacy","Public"],
        default:"Public"
    },
    CreatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    Like: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    DisLike: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    PostTime:{
        type:Date,
        default:Date.now()
    }, 
    totalVote:{
        type: Number,
        default: 0
    },
    comments:[CommentSchema]
},
{
    timestamps: true
})


export const PostsModel = mongoose.model("post",postSchema)