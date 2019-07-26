update entries
set entry = $2, image = $3, task_1 = $4, task_2 = $5, task_3 = $6, task_4 = $7, task_5 = $8
where id = $1;

select * from entries
where user_id = $9
ORDER BY id;