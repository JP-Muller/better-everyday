UPDATE users
SET posted_today = true
WHERE id = $1;

SELECT posted_today FROM users
WHERE id = $1;