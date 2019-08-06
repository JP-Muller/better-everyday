update entries
set public = true
where id = $1;

select * from entries
where user_id = $2
ORDER by id;