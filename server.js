const express = require('express');
const uuid = require('uuid');
const morgan = require('morgan');
const router = express.Router();
const app = express();
const jsonParser = require('body-parser').json();

const {BlogPosts} = require('./models.js');

app.use(morgan('common'));
app.use(jsonParser);


app.get('/blog-posts', (req, res) => {
    res.json(BlogPosts.get());
});

app.post('/blog-posts', (req, res) => {
    // console.log(req.body);
    const {title,content,author} = req.body;
    res.json(BlogPosts.create(title, content, author));
});

app.put('/blog-posts/:id',jsonParser, (req,res)=>{
    const requiredFields = ['title', 'content', 'author'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = (`Request path id (${req.params.id}) and request body id ``(${req.body.id}) must match`);
        console.error(message);
        return res.status(400).send(message);
    }
        console.log(`Updating blog-post item \`${req.params.id}\``);

    const updatedItem = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    });

    res.json(updatedItem);

});

app.delete('/blog-posts/:id',(req,res)=>{res.json(BlogPosts.delete());});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});