# NodeJs-Test-Task

## Prerequisite

System should have MongodDb and Nodejs installed.

## Steps to start the Application

Run `node index.js` in the root folder of the project.
Server will be running on port 3000

## Apis

### http://localhost:3000/api/hackernews/seed

This route is Public, This api will fetch data from HackerNews database and save it to our Database

### http://localhost:3000/api/hackernews/list?limit=5&skip=2

This route is not Public, this api will fetch data from our database for the user to View

This route have 2 parameters limit and skip
by default limit is 10, your can give custom value for it

Ex: limit=5

Similarly, for skip you can give custom value. It skips that many documents and fetchs the rest.



### http://localhost:3000/api/auth/register

This route is used to register,expected json is as such

{
    "username":"nameoftheuser",
    "password":"sflkjhas"
}

### http://localhost:3000/api/auth/login

This route is used to login,expected json is as such

{
    "username":"nameoftheuser",
    "password":"dfghwtdsh"
}

### http://localhost:3000/api/auth/refreshToken

This route is used to refresh the access token,expected json is as such

{
    "accessToken": "eyJhbGciOiJIUzI1g5M",
    "refreshToken": "eyJhbGciOiJIUz0Et-yC3r8"
}

### http://localhost:3000/api/hackernews/newpost

This route is used to create new post, expected json is as such

{
    "title":"Testing Going on",
    "website":"www.testingisgoingon.com"
}

the request should contain access token.

### http://localhost:3000/api/hackernews/upvote

This route is used to upvote a post, expected json is as such

{
    "postId": "5fed9cb1gddfg7f590469da31"
}

the request should contain access token.