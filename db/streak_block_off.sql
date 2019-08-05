UPDATE users
SET streak_block = 'f'
WHERE id = $1;