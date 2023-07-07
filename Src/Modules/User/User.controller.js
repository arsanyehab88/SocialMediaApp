import { UserModel } from "../../../DB/Models/UserModel/User.Model.js";
import { sendEmail } from "../../Email/Email.js";
import jwt from "jsonwebtoken"
import { HTML } from "../../Email/html.js";
import bcrypt from "bcrypt"
import { nanoid } from "nanoid"
import { FHTML } from "../../ForgetPassword/ForgetHtml.js";
import cloudinary from "../../utils/cloudinary.js";



//Sign Up
export const SignUp = async (req, res) => {
    try {
        let { secure_url } = await cloudinary.uploader.upload(req.file.path)
        const { name, email, password, age } = req.body;
        let exist = await UserModel.findOne({ email });
        if (exist) return res.json({ message: "Email already exist" });
        let hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
        let user = await UserModel.insertMany({ name, email, password: hashPassword, age })
        let token = jwt.sign({ email }, process.env.SECURTY_SERVICE)
        sendEmail(email, "confirm Email", HTML(token))
        res.json({ message: "Done", user });
    } catch (err) {
        res.json({ message: "err", err })
    }

}


//Verfy Account
export const Verfy = async (req, res) => {
    try {
        const { token } = req.params;
        jwt.verify(token, process.env.SECURTY_SERVICE, async (err, decoded) => {
            if (err) return res.json({ message: "err", err })
            let user = await UserModel.findOneAndUpdate({ email: decoded.email }, { CEmail: true }, { new: true })
            user.password = undefined
            res.json({ message: "Done", user })
        })
    } catch (err) {
        res.json({ message: "err", err })
    }


}

//Sign In
export const SignIn = async (req, res) => {

    try {
        const { email, password } = req.body;
        let exist = await UserModel.findOne({ email });
        if (!exist) return res.json({ message: "Email does not exist" })
        if (exist.CEmail == false) return res.json({ message: "Email Not Verfied" })
        let pas = bcrypt.compareSync(password, exist.password)
        if (!pas) return res.json({ message: "Password does not match" })
        if (exist.LogOut == true)return await UserModel.findOneAndUpdate({email},{LogOut:false})
        let token = jwt.sign({ email: exist.email, ID: exist._id }, process.env.SECURTY_KEY)
        res.json({ message: "Done", token })
    } catch (err) {
        console.log(err);
        res.json({ message: "err", err })
    }
}

export const LogOut= async (req,res)=>{
    try{
        let out = await UserModel.findById({_id:req.ID})
        if(out.LogOut == true) return res.json({message:"Already Logged Out"}) 
        let Log = await UserModel.findByIdAndUpdate({_id:req.ID},{LogOut:true},{new:true})
        res.json({message:"Done",Log})
    }catch (err) {
        res.json({ message:"Error",err })
    }
}


//To Send Code 
export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        const code = nanoid(4)
        let exist = await UserModel.findOne({ email });
        if (!exist) return res.json({ message: "Email does not exist" })
        if (exist.CEmail === false) return res.json({ message: "Email Not Verfied" })
        let user = await UserModel.findOneAndUpdate({ email }, { code }, { new: true })
        sendEmail(email, "Forget Password", FHTML(code))
        res.json({ message: "Go To Mail To Reset" })
    }
    catch (err) {
        res.json({ message: "err", err })
    }
}


//To Reset Password
export const ResetPassword = async (req, res) => {
    try {
        const { code, newPassword, ConfirmPassword } = req.body
        let exist = await UserModel.findOne({ code })
        if (!exist) return res.json({ message: "Code does not exist" })
        let result = bcrypt.compareSync(newPassword, exist.password)
        if (result) return res.json({ message: "Password  match old password" })
        if (newPassword !== ConfirmPassword) return res.json({ message: "Password does not match" })
        let hashPassword = await bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS))
        let updateOne = await UserModel.findOneAndUpdate({ code }, { password: hashPassword, code: "" }, { new: true })
        res.json({ message: "Done", updateOne })

    } catch (err) {
        res.json({ message: "err", err })
    }
}

// get Data From User
export const getUserData = async (req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.ID })
        if (!user) return res.json({ message: "User not found" })
        res.json({ message: "Done", user })
    } catch (err) {
        res.json({ message: "err", err });
    }
}

// Update Password
export const UpdatePass = async (req, res) => {
    try {
        const { oldPass, newpass, Cpass } = req.body
        let user = await UserModel.findOne({ _id: req.ID })
        if (!user) return res.json({ message: "Not Found" })
        if (oldPass === newpass || oldPass === Cpass) return res.json({ message: "Password Match New Password or Condrimed Password" })
        if (newpass !== Cpass) return res.json({ message: "New Password Not match confirm Password " })
        let result = bcrypt.compareSync(newpass, user.password)
        if (result) return res.json({ message: "New Password match Old Password" })
        let pass = bcrypt.compareSync(oldPass, user.password)
        if (!pass) return res.json({ message: "Wrong Password" })
        let HashPassword = bcrypt.hashSync(newpass, Number(process.env.SALT_ROUNDS))
        let UpdatePassword = await UserModel.findByIdAndUpdate(req.ID, { password: HashPassword }, { new: true })
        res.json({ message: "Done", UpdatePassword })
    } catch (err) {
        res.json({ message: "err", err });
    }
}


//Update Information
export const UpdateInfo = async (req, res) => {
    try {
        const { name, age } = req.body;
        let user = await UserModel.findByIdAndUpdate(req.ID, { name, age }, { new: true })
        res.json({ message: "Done", user });
    } catch (err) {
        res.json({ message: "err", err });
    }
}