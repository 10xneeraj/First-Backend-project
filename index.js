const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid'); 

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

//require uuid


//Method Override Middleware

app.use(methodOverride('_method'));


app.listen(port, () => {
  console.log(`REST API server running at http://localhost:${port}`);
});

let posts = [
    { id: uuidv4(), user: 'Neeraj', content: 'This is the first post.' },
    { id: uuidv4(), user: 'Ankita', content: 'Hello world! This is my first post.' },
    { id: uuidv4(), user: 'Rohit', content: 'Good morning everyone!' },
    { id: uuidv4(), user: 'Sneha', content: 'Just had a great lunch!' },
    { id: uuidv4(), user: 'Amit', content: 'Looking forward to the weekend.' },
];

app.get('/posts', (req, res) => {
  res.render('index.ejs' , { posts });
});



app.get('/', (req, res) => {
  res.render('index', { title: 'REST API Home' });
});

app.get('/posts/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/posts', (req, res) => {
    let { user, content } = req.body;
    let id = uuidv4();
    posts.push({ id, user, content });
    res.redirect('/posts');
});

app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let { user, content } = req.body;
    let post = posts.find(p => p.id === id);
        post.user = user;
        post.content = content;
    res.redirect('/posts');
});

app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect('/posts');
});

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);  
    if (!post) {
        return res.status(404).send(' {id: ' + id + '} Post not found or may have been deleted.');
    }  
    res.render('show.ejs', { post });
});

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).send(' {id: ' + id + '} Post not found or may have been deleted.');
    }   
    res.render('edit.ejs', { post });
});