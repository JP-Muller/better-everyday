select * from entries
where user_id = $1
order by id;