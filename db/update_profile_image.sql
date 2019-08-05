update users
set image = $1
where id = $2;

SELECT * FROM users
WHERE id = $2;
