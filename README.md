# Home_Tasks_nodeJs

Clone repository

Run `npm install`

Run `npm run task2_1`

##

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
"isDeleted: false"
}' http://localhost:7000/api/users -i`

##
 To update run:
 

`curl -X PUT -H 'Content-Type: application/json' -d '{
"login": "Janny",
"password": 'abrakadabra',
"age": "45",
"isDeleted: false"
}' http://localhost:7000/api/users/2 -i`


###
And delete can be tested by this command: 

`curl -X DELETE http://localhost:7000/api/users/2 -i`