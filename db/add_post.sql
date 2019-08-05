INSERT INTO entries (task_1, task_2, task_3, task_4, task_5, entry, image, date_posted, mood, user_id)
values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);

UPDATE users
SET xp = xp + 25
WHERE id = $10;

select * from entries
where user_id = $10
order by id;