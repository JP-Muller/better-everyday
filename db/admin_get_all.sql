SELECT
  entries.id,
  username,
  entry,
  task_1,
  task_2,
  task_3,
  task_4,
  task_5,
  entries.image,
  date_posted
FROM
   entries
INNER JOIN users ON users.id = entries.user_id

ORDER BY entries.id DESC;