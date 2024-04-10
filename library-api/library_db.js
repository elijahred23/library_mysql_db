const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'library_db',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'library_db'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID: ' + connection.threadId);
});

const executeLibraryDBQuery = (query) => {
    return new Promise((resolve, reject) => {
        // Perform SQL query
        connection.query(query, (err, results, fields) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
                return;
            }
            console.log('results:', results);
            resolve(results);
        });
    });
};


const getAuthors = async () => {
    return await executeLibraryDBQuery('SELECT * FROM Authors');
}
const getBooks =async () => {
    return await executeLibraryDBQuery("SELECT * FROM Books;");
}

const getUsers = async () => {
    return await executeLibraryDBQuery("SELECT * FROM Users;");
}
const getCheckouts = async () => {
    return await executeLibraryDBQuery("SELECT * FROM Checkouts;");
}
const endConnection = () => {
    // Close the connection
    connection.end((err) => {
        if (err) {
            console.error('Error closing MySQL connection: ' + err.stack);
            return;
        }
        console.log('MySQL connection closed.');
    });
}


module.exports = {
    getAuthors,
    getBooks,
    getUsers,
    getCheckouts,
    endConnection
}