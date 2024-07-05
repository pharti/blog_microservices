const express = require('express')
const { v4: uuidv4 } = require("uuid")
const bodyParser = require('body-parser')

const app = express()
const port = 4001;

app.use(bodyParser.json())

let commentsByPostId = {};

app.get('/posts/:postId/comments', (req, res) => {
    let comments = commentsByPostId[req.params.postId] || [];
    res.status(200).send(comments);
})

app.post('/posts/:postId/comments', (req, res) => {
    try {

        let id = uuidv4();
        let { content } = req.body;
        let comments = commentsByPostId[req.params.postId] || [];

        comments.push({ id, content });

        commentsByPostId[req.params.postId] = comments;

        res.status(200).send(commentsByPostId || []);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})