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
    users.image AS profile_image,
    mood,
    date_posted
    FROM 
    entries
    INNER JOIN users ON users.id = entries.user_id
    WHERE public = false

    ORDER BY entries.id DESC;