
import mongoose from "mongoose";



const UserSchema =new mongoose.Schema({
    name:String,
    email:String,
    CEmail:{
        type:Boolean,
        default:false
    },
    LogOut:{
        type:Boolean,
        default:false
    },
    password:String,
    age:{
        type:Number
    },
    code:{
        type : String,
        default:""
    },
    photo:String
},{
    timestamps:true
})

export const UserModel = mongoose.model("User",UserSchema)