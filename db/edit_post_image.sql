update entries
set image = $2
where id = $1;

select * from entries
where user_id = $3
order by id;