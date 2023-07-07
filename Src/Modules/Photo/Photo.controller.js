import { PhotoModel } from "../../../DB/Models/PhotoModel/Photo.model.js"
import cloudinary from "../../utils/cloudinary.js"





export const AddPhoto = async (req, res, next) => {
    try{
        let { secure_url } = await cloudinary.uploader.upload(req.file.path)
        let exist = await PhotoModel.findOne({ _id:req.userId })
        if(exist)return res.json({message: "Photo already exists",exist})
        let photo = await PhotoModel.insertMany({ path: secure_url, createdBy:req.ID })
        if (!req.file) return res.json({ message: "Invalid File" })
        res.json({ message: "Done", photo })
    }catch(err){
        res.json({message:"Error",err})
        console.log(err);
    }
}


export const DeletePhoto = async (req, res, next) => {
    try{
        const {_id}=req.body
        let result = await PhotoModel.findById(_id)
        if(result.createdBy != req.ID) return res.json({message:"You are not allowed to delete"})
        if(!result) return res.json({message:"Not Found"})
        let exist = await PhotoModel.findByIdAndDelete(_id)
        res.json({message:"Done",exist})
    }catch(err){
        res.json({message:"Error",err})
    }
}   