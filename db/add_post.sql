INSERT INTO entries (task_1, task_2, task_3, task_4, task_5, entry, image, date_posted, user_id)
values($1, $2, $3, $4, $5, $6, $7, $8, $9);

select * from entries
where user_id = $9
order by id;