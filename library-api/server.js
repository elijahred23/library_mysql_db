const express = require("express");
const { getAuthors, getBooks, getUsers, getCheckouts } = require("./library_db");

const app = express();

const port = 3009;

app.get('/', (req,res)=>{
    res.send('Welcome to the library_db API.')
})

app.get('/authors', async (req,res)=>{
    let authors = await getAuthors();
    res.send({authors});
})

app.get('/books', async (req,res)=>{
    let books = await getBooks();
    res.send({books});
})

app.get('/users', async (req,res)=>{
    let users = await getUsers();
    res.send({users});
})
app.get('/checkouts', async (req,res)=>{
    let checkouts = await getCheckouts();
    res.send({checkouts});
})
app.all('*', (req,res) => {
    res.status(404).send({
        message: 'Sorry, that request didn\'t match any of the endpoints',
        status_code: 404 
    });
})
app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})