import mongoose from "mongoose";




const PhotoSchema = new mongoose.Schema({
    path: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},
    { timestamps: true }
)

export const PhotoModel = mongoose.model("Photo", PhotoSchema)