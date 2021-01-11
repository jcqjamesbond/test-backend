## Documentation
Make sure you have Docker installed

## RUN
1. docker build -t {image_name} .
2. docker-compose up -d
The image name should be identical as the image name under node service in docker-compose.yml, here I use node-test as the image name of node service
I was tring to define the docker build argument in docker-compose.yml, however, the speed of performing 'npm install' is too slow by that way

enter http://localhost:3000 in the web browser to test the server.

## API
GET /api/user/{id}
get the user information according to the user _id

#Response
json
{
  msg: string,
  data: Object
}

POST /api/user/
create new user

{
  data: {
    name string
    dob string

  }
}

#Response
json
{
  msg: string,
  data: Object
}

POST /api/user/{id}
update user according to id

#Response
json
{
  msg: string,
  data: Object
}

DELETE /api/user/{id}
delete user according to id
#Response
json
{
  msg: string,
  data: Object
}



