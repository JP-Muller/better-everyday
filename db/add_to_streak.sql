
UPDATE users
set score_streak = (CASE WHEN last_date_posted = $2
                        THEN score_streak + 1
                        ELSE score_streak + 0
                    END),
    highest_streak = (CASE WHEN score_streak > highest_streak
                        THEN score_streak
                        ELSE highest_streak + 0
                      END) 
                
WHERE id = $1;


SELECT score_streak, highest_streak FROM users
WHERE id = $1;