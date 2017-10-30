## Database Schema

### ~~families~~
id
name

### parents
id
username
password (encrypted)
family_id (foreign key)

### children
id
username
password
name
gender
family_id

### chores
id
title
start_date
end_date
recur_weekly bool
value (decimal)
child_id

## completed_chores
id
timestamp
chore_id
