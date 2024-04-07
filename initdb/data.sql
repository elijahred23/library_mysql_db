-- Insert sample authors
INSERT INTO Authors (name) VALUES 
('J.K. Rowling'), 
('Stephen King'), 
('Agatha Christie'), 
('George Orwell');

-- Insert sample books
INSERT INTO Books (title, author_id, ISBN, available_quantity) VALUES 
('Harry Potter and the Philosopher''s Stone', 1, '9780747532743', 10), 
('The Shining', 2, '9780385121675', 5), 
('Murder on the Orient Express', 3, '9780007119318', 7), 
('1984', 4, '9780451524935', 8);

-- Insert sample users
INSERT INTO Users (username, email) VALUES 
('john_doe', 'john@example.com'), 
('jane_doe', 'jane@example.com'), 
('michael_smith', 'michael@example.com');

-- Insert sample checkouts
INSERT INTO Checkouts (book_id, user_id, checkout_date, due_date) VALUES 
(1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 14 DAY)),   -- John Doe checks out Harry Potter
(2, 2, NOW(), DATE_ADD(NOW(), INTERVAL 21 DAY)),   -- Jane Doe checks out The Shining
(3, 3, NOW(), DATE_ADD(NOW(), INTERVAL 10 DAY)),   -- Michael Smith checks out Murder on the Orient Express
(4, 1, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY));    -- John Doe checks out 1984
