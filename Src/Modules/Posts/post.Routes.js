import Router from "express"
import { auth } from "../../MiddleWare/auth.js"
import { AddComment, CreatePost, DeletePost, DisLike, Like, PrivacyPost, PublicPost, updatePost, GetPosts, Posts, GetPrivacyPotst, DeleteComment, UpdateComment } from "./Post.controller.js"
import { Valdiation } from "../../MiddleWare/Valdition.js"
import { PostsSchema, commentsSchema } from "./Valdition/Valdition.Post.js"



const PostRouters = Router()



PostRouters.post("/AddPost", auth, Valdiation(PostsSchema), CreatePost)

PostRouters.put("/Like", auth, Like)

PostRouters.put("/DisLike", auth, DisLike)

PostRouters.put("/Privacy", auth, PrivacyPost)

PostRouters.put("/Public", auth, PublicPost)

PostRouters.patch("/UpdatePost", auth, updatePost)

PostRouters.delete("/DeletePost", auth, DeletePost)

PostRouters.post("/GetPosts", auth, GetPosts)

PostRouters.post("/GetPrivacyPosts", auth, GetPrivacyPotst)

PostRouters.get("/Posts", Posts)

PostRouters.patch("/AddComment", auth, AddComment)

PostRouters.put("/UpdateComment", auth, UpdateComment)

PostRouters.delete("/DeleteComment", auth, DeleteComment)




export default PostRouters