UPDATE users
SET posted_today = false
WHERE id = $1;

SELECT posted_today FROM users
WHERE id = $1;