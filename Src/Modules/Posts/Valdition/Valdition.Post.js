import joi from "joi"



export const PostsSchema = joi.object({
    Title:joi.string()
    .min(3)
    .max(30)
    .required(),
    text:joi.string()
    .min(3)
    .max(100)
    .required(),
})

export const commentsSchema = joi.object({
    comment:joi.string()
    .min(3)
    .max(70)
    .required()
})