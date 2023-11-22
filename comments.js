// Create web server application


// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

// Create web server application
const app = express();

// Connect to MongoDB server
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create routes
app.get('/comments', (req, res) => {
    Comment.find().then((comments) => {
        res.send(comments);
    });
});

app.post('/comments', (req, res) => {
    let comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save().then((commentDoc) => {
        res.send(commentDoc);
    });
});

// Start web server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
