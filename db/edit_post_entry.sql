update entries
set entry = $2
where id = $1;

select * from entries
where user_id = $3
order by id;