## Documentation
Make sure you have Docker installed

## RUN
1. docker build -t {image_name} .
2. docker-compose up -d
The image name should be identical as the image name under node service in docker-compose.yml, here I use node-test as the image name of node service
I was tring to define the docker build argument in docker-compose.yml, however, the speed of performing 'npm install' is too slow by that way

enter http://localhost:3000 in the web browser to test the server.

## API

1. get user
GET /api/user/{id}
get the user information according to the user's _id

#Response
json
{
  msg: string,
  data: Object
}

2. create new user
POST /api/user/
create new user

{
  data: {
    name string
    dob string
    description string
    longitude number
    latitude number
  }
}

#Response
json
{
  msg: string,
  data: Object
}

3. update user
POST /api/user/{id}
update user according to user's _id

#Response
json
{
  msg: string,
  data: Object
}

4. delete user
DELETE /api/user/{id}
delete user according to id
#Response
json
{
  msg: string,
  data: Object
}


## TEST
After starting the express server, run the following command to perform the test
1. npm test
