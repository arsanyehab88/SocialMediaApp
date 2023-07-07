import { PostsModel } from "../../../DB/Models/PostModel/Post.Model.js";




//Add Post
export const CreatePost = async (req, res) => {
    try {
        const { Title, text } = req.body;
        let result = await PostsModel.insertMany({ Title, text, CreatedBy: req.ID })
        res.json({ message: "Done", result })
    } catch (err) {
        res.json({ message: "error", err })
    }
}

//Like Post
export const Like = async (req, res) => {
    try {
        let { postId } = req.body
        let up = await PostsModel.findByIdAndUpdate(postId,
            {
                $addToSet: { Like: [req.ID] },
                $pull: { DisLike: req.ID }
            },
            { new: true }
        )
        up.totalVote = up.Like.length - up.DisLike.length
        up.save()
        res.json({ message: "Done", up })
    } catch (err) {
        res.json({ message: "error", err })
    }
}
//DisLike Post
export const DisLike = async (req, res) => {
    try {
        let { postId } = req.body
        let up = await PostsModel.findByIdAndUpdate(postId,
            {
                $addToSet: { DisLike: [req.ID] },
                $pull: { Like: req.ID }
            },
            { new: true }
        )
        up.totalVote = up.Like.length - up.DisLike.length
        up.save()
        res.json({ message: "Done", up })
    } catch (err) {
        res.json({ message: "error", err })
    }
}


//change to Privacy
export const PrivacyPost = async (req, res) => {
    try {
        const { post } = req.body;
        let result = await PostsModel.findById(post)
        if (result.status == "Privacy") return res.json({ message: "Already Privacy" })
        if (!result) return res.json({ message: "Not Found" })
        if (result.CreatedBy != req.ID) return res.json({ messaeg: "you are not allowed" })
        let exist = await PostsModel.findByIdAndUpdate({ _id: post }, { status: "Privacy" }, { new: true })
        res.json({ message: "Done", exist })
    } catch (err) {
        res.json({ message: "error", err })
    }
}

//change to Public
export const PublicPost = async (req, res) => {
    try {
        const { post } = req.body;
        let result = await PostsModel.findById(post)
        if (result.status == "Public") return res.json({ message: "Already Public" })
        if (!result) return res.json({ message: "Not Found" })
        if (result.CreatedBy != req.ID) return res.json({ messaeg: "you are not allowed" })
        let exist = await PostsModel.findByIdAndUpdate({ _id: post }, { status: "Public" }, { new: true })
        res.json({ message: "Done", exist })
    } catch (err) {
        res.json({ message: "error", err })
    }
}

//Update Post
export const updatePost = async (req, res) => {
    try {
        const { text, Title, post } = req.body;
        let result = await PostsModel.findById(post)
        if (!result) return res.json({ message: "Not Found" })
        if (result.CreatedBy != req.ID) return res.json({ messaeg: "you are not allowed" })
        let exist = await PostsModel.findByIdAndUpdate({ _id: post }, { text, Title }, { new: true })
        res.json({ message: "Done", exist })
    } catch (err) {
        res.json({ message: "error", err })
    }
}

//Delete a post
export const DeletePost = async (req, res) => {
    try {
        const { post } = req.body;
        let result = await PostsModel.findById(post)
        if (!result) return res.json({ message: "Not Found" })
        if (result.CreatedBy != req.ID) return res.json({ messaeg: "you are not allowed" })
        let exist = await PostsModel.findByIdAndDelete({ _id: post })
        res.json({ message: "Done", exist })
    } catch (err) {
        res.json({ message: "error", err })
    }
}


//get Posts profile
export const GetPosts = async (req, res) => {
    try {
        let result = await PostsModel.find({ CreatedBy: req.ID })
        if (result.length < 0) return res.json({ message: "Not Found" })
        res.json({ message: "Done", result })
    } catch (err) {
        res.json({ message: "error", err })
    }
}

//Get Privacy posts
export const GetPrivacyPotst = async (req, res) => {
    try {
        let result = await PostsModel.find({ CreatedBy: req.ID, status: "Privacy" })
        if (!result) return res.json({ message: "Not Found Privacy Posts" })
        res.json({ message: "Done", result })
    } catch (err) {
        res.json({ message: "error", err })
    }
}


//Get All Posts
export const Posts = async (req, res) => {
    try {
        let result = await PostsModel.find({ status: "Public" })
        if (!result) return res.json({ message: "Not Found" })
        res.json({ message: "Done", result })
    } catch (err) {
        console.log(err);
        res.json({ message: "error", err })
    }
}

//Add comment
export const AddComment = async (req, res) => {
    try {
        const { comment, post } = req.body
        let exist = await PostsModel.findByIdAndUpdate({ _id: post },
            {
                $push: { comments: { comment, comentedBy: req.ID } }
            }, { new: true })
        res.json({ message: "Done", exist })
    } catch (err) {
        res.json({ message: "error", err })
    }
}


export const DeleteComment = async (req, res) => {
    try {
        const { post, Id } = req.body
        let result = await PostsModel.findOne({ _id: post }, { comments: { $elemMatch: { _id: Id, comentedBy: req.ID } } })
        if (result.comments.length == 0) return res.json({ message: "You are not allowed to delete" })
        let exist = await PostsModel.findOneAndUpdate({ _id: post }, { $pull: { comments: { _id: Id, comentedBy: req.ID } } }, { new: true })
        res.json({ message: "Done", exist })
    } catch (err) {
        res.json({ message: "error", err })
    }
}


export const UpdateComment = async (req, res) => {
    try {
        const { IdPost, IdComment, comment } = req.body
        let result = await PostsModel.updateOne({ _id: IdPost, 'comments._id': IdComment }, { $set: { 'comments.$.comment': comment } }, { new: true })
        res.json({ message: "Done", result })

    } catch (err) {
        res.json({ message: "error", err })
    }
}







