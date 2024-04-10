const {getAuthors,getBooks, getUsers,getCheckouts} = require('./library_db');

const test = async () => {
    let authors = await getAuthors();
    console.log({authors})
}


test();

