# Home_Tasks_nodeJs

Clone repository

Run `npm install`

Run `npm run app`

##

# Users

Check the result via postman on curl:

base url would be `http://localhost:7000/api/users`

##

`curl http://localhost:7000/api/users -i` To get all users

###

`curl http://localhost:7000/api/users/1 -i` (I've added two mocked users)

###

To add new user via console, run:

`curl -X POST -H 'Content-Type: application/json' -d '{
"login": "Test",
"password": 'abrakadabra',
"age": "45",
"isDeleted": "false"
}' http://localhost:7000/api/users -i`

##
 To update run:
 

`curl -X PATCH -H 'Content-Type: application/json' -d '{
"login": "Janny",
"password": 'abrakadabra',
"age": "45",
"isDeleted": "false"
}' http://localhost:7000/api/users/2 -i`


##
To get by loginString run, limited by some number and sorted alphabetically:


`curl http://localhost:7000/api/users/search?loginSubstring=Jo&limit=1000 -i`


###
And delete can be tested by this command: 

`curl -X DELETE http://localhost:7000/api/users/2 -i`



# Groups


##

Check the result via postman on curl:

base url would be `http://localhost:7000/api/groups`

##

`curl http://localhost:7000/api/groups -i` To get all groups - mocked in groups_4_1.sql

###

`curl http://localhost:7000/api/groups/1 -i` (I've added few mocked groups)

###

To add new group via console, run:

`curl -X POST -H 'Content-Type: application/json' -d '{
"name": "delete",
"permission": 'DELETE'
}' http://localhost:7000/api/groups -i`

##
To update run:


`curl -X PATCH -H 'Content-Type: application/json' -d '{
"name": "Delete"
}' http://localhost:7000/api/groups/2 -i`


###
And delete can be tested by this command:

`curl -X DELETE http://localhost:7000/api/groups/2 -i`


# addUsersToGroup Transaction 

run addUsersToGroup.sql query in postgress
