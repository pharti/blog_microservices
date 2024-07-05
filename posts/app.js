const express = require('express')
const { v4 : uuidv4 } = require("uuid")
const bodyParser = require('body-parser')

const app = express()
const port = 4000;

app.use(bodyParser.json())

let allPosts = {};
app.get('/posts', (req, res) => {
    res.status(200).send(allPosts);
})

app.post('/posts', (req, res) => {
    try {
        if (req.body) {
            let {title} = req.body;
            let id = uuidv4();

            allPosts[id] = {
                id, title
            }
        }

        res.status(200).send(allPosts || []);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})