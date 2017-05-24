const express = require('express');
const uuid = require('uuid');
const morgan = require('morgan');
const router = express.Router();
const app = express();
const jsonParser = require("body-parser").json();

const {BlogPosts} = require('./models.js');

app.use(morgan('common'));
app.use(jsonParser);

BlogPosts.create('horse','test','saule');
BlogPosts.create('milk','test','Sandy');

app.get('/blog-posts', (req, res) => {
    res.json(BlogPosts.get());
});

app.post('/blog-posts', (req, res) => {
    // console.log(req.body);
    const {title,content,author} = req.body;
    res.json(BlogPosts.create(title, content, author));
});

app.delete('/blog-posts',(req,res)=>{res.json(BlogPosts.delete());});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});