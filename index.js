import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connecting } from './DB/connection.js';
import UserRoutes from './Src/Modules/User/User.Routes.js';
import PhotoRoutes from './Src/Modules/Photo/Photo.routes.js';
import PostRouters from './Src/Modules/Posts/post.Routes.js';

const app = express();
const port = 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
connecting()

app.use("/User",UserRoutes)

app.use("/Photo",PhotoRoutes)

app.use("/Post",PostRouters)

app.listen(port,()=>{
    console.log(`Server listening on ${port}`);
})