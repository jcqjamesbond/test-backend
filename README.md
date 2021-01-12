## Documentation
Make sure you have Docker installed

## RUN
1. npm install
2. npm run build
3. docker build -t {image_name} .
4. docker-compose up -d
The image name should be identical as the image name under node service in docker-compose.yml, here I use node-test as the image name of node service
I was tring to define the docker build argument in Dockerfile and docker-compose.yml, however, the speed of performing 'npm install' is too slow by that way

enter http://localhost:3000 in the web browser to test the server.

## API
1. 
/**
* api GET /api/user/1
* @apiName GetUser
* 
* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK
*   {
*     "msg": "get user successfully.",
*     "data": {
*       "user": {
*          "name": "",
*          "description": "",
*          "dob": "1990-01-01",
*          "createdAt": "",
*          "address": {
*              "name": "Huashan Rd",
*              "latitude": "",
*              "longitude": ""
*          }
*        }
*     }
*   }
* 
* @apiErrorExample Error-Response:
*   HTTP/1.1 500 Internal Server Error
*   {
*     "msg": "GET_FAILURE",
*     "data": {
*       "_id": ""
*     }
*   }
*/

2.
/**
* create new user
* @api POST /api/user/
* @apiName CreateUser
* 
* @apiParam {Object} data
* @apiParam {String} name
* @apiParam {String} dob
* @apiParam {String} description
* @apiParam {Number} latitude
* @apiParam {Number} longitude
* 
* @apiPostBodyExample
* {
*    "data": {
*       "name": "James",
*       "dob": "2000-01-01",
*       "description": "general",
*       "addressName": "Middle Huaihai Rd.",
*       "latitude": 34.5,
*       "longitude": 112.5
*    }
* }
* 
* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK
*   {
*     "msg": "created user successfully.",
*     "data": {
*       "_id": "uiocweryf92eh8ou"
*     }
*   }
* 
* @apiErrorExample Error-Response:
*   HTTP/1.1 500 Internal Server Error
*   {
*     "msg": "CREATE_FAILURE",
*     "data": {
*       "e": ""
*     }
*   }
* 
*/

3.
/**
* update user
* 
* @api POST /api/user/1
* @apiName UpdateUser
* 
* @apiParam {Object} data
* @apiParam {String} name
* @apiParam {String} dob
* @apiParam {String} description
* @apiParam {Number} latitude
* @apiParam {Number} longitude
* 
* @apiPostBodyExample
* {
*    "data": {
*       "name": "James",
*       "dob": "2000-01-01",
*       "description": "general",
*       "addressName": "Middle Huaihai Rd.",
*       "latitude": 34.5,
*       "longitude": 112.5
*    }
* }
* 
* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK
*   {
*     "msg": "updated user successfully.",
*     "data": {
*       "_id": ""
*     }
*   }
* 
* @apiErrorExample Error-Response:
*   HTTP/1.1 500 Internal Server Error
*   {
*     "msg": "UPDATE_FAILURE",
*     "data": {
*       "e": ""
*     }
*   }
*/

4.
/**
* delete user
* @api POST /api/user/1
* @apiName DeleteUser
*/

5.
/**
* get nearby users
* @api POST /api/user/nearby/1
* @apiName GetNearbyUsers
* 
* @apiParam {Object} data
* @apiParam {String} distance

* @apiPostBodyExample
* {
*    "data": {
*       "maxDistance": 1000
*    }
* }
* 
* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK
*   {
*     "msg": "get nearby users",
*     "data": {
*       "nearby_users": [
*          { 
*             _id: "",
*             name: ""
*          },
*          {
*             _id: "",
*             name: ""
*          }
*       ]
*     }
*   }
* 
* @apiErrorExample Error-Response:
*   HTTP/1.1 500 Internal Server Error
*   {
*     "msg": "GET_NEARBY_USER_FAILURE",
*     "data": {
*       "e": ""
*     }
*   }
*/

## TEST
After starting the express server, run the following command to perform the test
1. npm test
