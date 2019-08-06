UPDATE users
SET streak_block = false
WHERE id = $1;