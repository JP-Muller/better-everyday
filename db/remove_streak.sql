UPDATE users
SET score_streak = 0
WHERE id = $1;

SELECT score_streak FROM users
WHERE id = $1;