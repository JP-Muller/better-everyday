UPDATE users
SET level = level + 1
WHERE id = $1;

SELECT * FROM users
WHERE id = $1;