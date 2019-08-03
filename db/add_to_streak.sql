UPDATE users
SET score_streak = score_streak + 1
WHERE id = $1;

SELECT * FROM users
WHERE id = $1;