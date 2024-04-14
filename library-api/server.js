const express = require("express");
const { getAuthors, getBooks, getUsers, getCheckouts, getAuthorById, getBookById, getUserById } = require("./library_db");

const app = express();

const port = 3009;

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET','POST','PUT','DELETE');
    res.header('Access-Control-Allow-Headers', 'Contenty-Type');
    next();
});
app.get('/', (req,res)=>{
    res.send('Welcome to the library_db API.')
})

app.get('/authors', async (req,res)=>{
    let authors = await getAuthors();
    res.send({authors});
})

app.get('/authors/:id', async (req,res)=>{
    const {id} = req.params
    let author = await getAuthorById(id);
    res.send({author})
})

app.get('/books', async (req,res)=>{
    let books = await getBooks();
    res.send({books});
})
app.get('/books/:id', async (req,res)=>{
    const {id} = req.params
    let book= await getBookById(id);
    res.send({book});
})
app.get('/users', async (req,res)=>{
    let users = await getUsers();
    res.send({users});
})
app.get('/users/:id', async (req,res)=>{
    const {id} = req.params
    let user = await getUserById(id);
    res.send({user});
})
app.get('/checkouts', async (req,res)=>{
    let checkouts = await getCheckouts();
    res.send({checkouts});
})
app.get('/checkouts/:id', async (req,res)=>{
    const {id} = req.params
    let checkouts = await getCheckouts(id);
    res.send({checkouts});
})
app.all('*', (req,res) => {
    res.status(404).send({
        message: 'Sorry, that request didn\'t match any of the endpoints',
        status_code: 404 
    });
})
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({ message: 'Internal Server Error' });
});
app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})