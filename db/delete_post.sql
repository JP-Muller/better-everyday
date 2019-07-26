delete from entries
where id = $1;

select * from posts
where user_id = $2;