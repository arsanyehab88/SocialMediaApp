import mongoose from "mongoose";


export const CommentSchema = new mongoose.Schema({
    comment: String,
    comentedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})



