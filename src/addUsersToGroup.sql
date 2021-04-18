-- transaction addUsersToGroup
BEGIN;

-- insert a new row into the user_group table
INSERT INTO public.user_group(group_id, user_id)
VALUES(2,3);

-- commit the change (or roll it back later)
COMMIT;