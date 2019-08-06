UPDATE users
SET last_date_posted = $2
WHERE id = $1;
