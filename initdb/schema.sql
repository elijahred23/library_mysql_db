-- Create Authors table
CREATE TABLE Authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create Books table
CREATE TABLE Books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    ISBN VARCHAR(255),
    available_quantity INT,
    FOREIGN KEY (author_id) REFERENCES Authors(id)
);

-- Create Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Create Checkouts table
CREATE TABLE Checkouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    user_id INT,
    checkout_date DATETIME,
    due_date DATETIME,
    FOREIGN KEY (book_id) REFERENCES Books(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
