-- SQLite

--Viweing the list of books with their owners
SELECT books.title, users.username
FROM books
JOIN users ON books.owner_id = users.id;

-- Viewing the list of users with their hashed passwords
-- Note: Storing hashed passwords in plaintext is not recommended for production systems
SELECT id AS user_id, username, hashed_password
FROM users;

-- Viewing the number of books each owner has created
SELECT users.id AS user_id, users.username, COUNT(books.id) AS books_created
FROM users
LEFT JOIN books ON books.owner_id = users.id
GROUP BY users.id, users.username
ORDER BY users.id;