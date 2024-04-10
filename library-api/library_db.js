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

const updateAuthor = async (id, name) => {
  const query = `UPDATE Authors SET name = ${name} WHERE id = ${id}`;
  await executeLibraryDBQuery(query);
};

const updateBook = async (id, title, authorId, ISBN, availableQuantity) => {
  const query = `UPDATE Books SET title = ${title}, author_id = ${authorId}, ISBN = ${ISBN}, available_quantity = ${availableQuantity} WHERE id = ${id}`;
  await executeLibraryDBQuery(query);
};

const updateUser = async (id, username, email) => {
  const query = `UPDATE Users SET username = ${username}, email = ${email} WHERE id = ${id}`;
  await executeLibraryDBQuery(query);
};

const updateCheckout = async (id, bookId, userId, checkoutDate, dueDate) => {
  const query = `UPDATE Checkouts SET book_id = ${bookId}, user_id = ${userId}, checkout_date = ${checkoutDate}, due_date = ${dueDate} WHERE id = ${id}`;
  await executeLibraryDBQuery(query);
};
const deleteAuthor = async (id) => {
  const query = `DELETE FROM Authors WHERE id = ${id}`;
  await executeLibraryDBQuery(query);
};

const deleteBook = async (id) => {
  const query = `DELETE FROM Books WHERE id = ${id}`;
  await executeLibraryDBQuery(query);
};

const deleteUser = async (id) => {
  const query = `DELETE FROM Users WHERE id = ${id}`;
  await executeLibraryDBQuery(query, [id]);
};

const deleteCheckout = async (id) => {
  const query = `DELETE FROM Checkouts WHERE id = ${id}`;
  await executeLibraryDBQuery(query);
};
// Get a specific author by ID
const getAuthorById = async (id) => {
  const query = `SELECT * FROM Authors WHERE id = ${id}`;
  const results = await executeLibraryDBQuery(query);
  return results.length > 0 ? results[0] : null;
};

// Get a specific book by ID
const getBookById = async (id) => {
  const query = `SELECT * FROM Books WHERE id = ${id}`;
  const results = await executeLibraryDBQuery(query);
  return results.length > 0 ? results[0] : null;
};

// Get a specific user by ID
const getUserById = async (id) => {
  const query = `SELECT * FROM Users WHERE id = ${id}`;
  const results = await executeLibraryDBQuery(query);
  return results.length > 0 ? results[0] : null;
};

// Get a specific checkout by ID
const getCheckoutById = async (id) => {
  const query = `SELECT * FROM Checkouts WHERE id = ${id}`;
  const results = await executeLibraryDBQuery(query);
  return results.length > 0 ? results[0] : null;
};

// Check if a book is available (available_quantity > 0)
const isBookAvailable = async (bookId) => {
  const query = `SELECT available_quantity FROM Books WHERE id = ${bookId}`;
  const results = await executeLibraryDBQuery(query);
  return results.length > 0 && results[0].available_quantity > 0;
};

// Checkout a book (assuming `isBookAvailable` is checked beforehand)
const checkoutBook = async (bookId, userId, checkoutDate, dueDate) => {
  const query = `INSERT INTO Checkouts (book_id, user_id, checkout_date, due_date) VALUES (${bookId}, ${userId}, ${checkoutDate}, ${dueDate})`;
  await executeLibraryDBQuery(query, [bookId, userId, checkoutDate, dueDate]);
  // Decrement available quantity after successful checkout
  await updateBook(bookId, null, null, null, -1); // Update only available_quantity
};

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
    deleteAuthor,
    deleteBook,
    deleteCheckout,
    deleteUser,
    updateAuthor,
    updateBook,
    updateCheckout,
    updateUser,
    getAuthorById,
    getBookById,
    getUserById,
    getCheckoutById,
    isBookAvailable,
    checkoutBook,
    endConnection
}