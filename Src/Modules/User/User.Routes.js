import express from "express"
import { LogOut, ResetPassword, SignIn, SignUp, UpdateInfo, UpdatePass, Verfy, forgetPassword, getUserData } from "./User.controller.js"
import { auth } from "../../MiddleWare/auth.js"
import { Valdiation } from "../../MiddleWare/Valdition.js"
import { signInSchema, signUpSchema } from "./Valdition/valdition.schema.js"
import { FileUpload } from "../../utils/FileUpload.js"


const UserRoutes = express.Router()


UserRoutes.post("/SignUp", FileUpload(), Valdiation(signUpSchema), SignUp)

UserRoutes.get("/:token", Verfy)

UserRoutes.post("/SignIn", Valdiation(signInSchema), SignIn)

UserRoutes.put("/LogOut", auth, LogOut)

UserRoutes.put("/Reset", forgetPassword)

UserRoutes.put("/ForgetPassword", ResetPassword)

UserRoutes.post("/GetUser", auth, getUserData)

UserRoutes.patch("/UpdatePassword", auth, UpdatePass)

UserRoutes.put("/updateInfo", auth, UpdateInfo)

export default UserRoutes;