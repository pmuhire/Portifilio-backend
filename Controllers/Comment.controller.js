// const User = require('../../models/Users')
const Blog = require('../Models/Blog.model')
const Comment = require('../Models/Comment')
const User = require("../Models/User")

exports.createComment = async (req, res) => {
    const { text, image, user } = req.body
    if (!text || (text.trim().length === 0 && !image)) {
        return res.status(422).send({ error: 'enter something or comment image' })
    }

    const theUser = await User.find({ _id: user });
    if (!theUser) {
        return res.status(404).json({ error: 'First signup' })
    }
    try {
        const blog = await Blog.find({ _id: req.params.id });
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' })
        }
        
        let body = {}
        if (image) {
            body.image = image
        }

        if (text) {
            body.text = text
        }

        const createComment = new Comment({
            user: user,
            blog: req.params.id,
            body,
        })

        const saveComment = await createComment.save()
        // blog.comments.push(createComment.id)
        console.log(createComment)
        return res.status(201).send({
            message: 'commented on Blog successfully',
            comment: saveComment,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" })
    }
}

exports.fetchComments = async (req, res) => {

    try {
        const comments = await Comment.find()
        return res.status(202).send(comments)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" })
    }
}

exports.likeDislikeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return res.status(404).json({ error: 'comment not found' })
        }

        const index = comment.likes.indexOf(req.userId)
        if (index !== -1) {
            comment.likes.splice(index, 1)
            await comment.save()

            return res.status(200).send({ message: 'removed likes' })
        }

        comment.likes.push(req.userId)
        await comment.save()
        return res.status(200).send({ message: 'add like' })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ error: "Something went wrong" })
    }
}