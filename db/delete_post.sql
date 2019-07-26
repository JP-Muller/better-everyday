delete from entries
where id = $1;

select * from entries
where user_id = $2
order by id;