import Router from "express"
import { FileUpload } from "../../utils/FileUpload.js"
import { AddPhoto, DeletePhoto } from "./Photo.controller.js"
import { auth } from "../../MiddleWare/auth.js"




const PhotoRoutes = Router()


PhotoRoutes.post("/AddPhoto", auth, FileUpload(), AddPhoto)

PhotoRoutes.delete("/DeletePhoto",auth,DeletePhoto)


export default PhotoRoutes