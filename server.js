const express = require('express');
const uuid = require('uuid');
const morgan = require('morgan');
const router = express.Router();
const app = express();
// const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models.js');


app.use(morgan('common'));
// BlogPost.create();


BlogPosts.create("horse", "test", "saule");

app.get('/blog-post', (req, res) => {

    res.json(BlogPosts.get());
    
});




app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});