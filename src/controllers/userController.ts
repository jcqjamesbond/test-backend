import express, { Request, Response, json } from "express";
import mongoose from "mongoose";
import User, {IUser} from "../models/user";

export default {
    /**
     * create new user
     * @api POST /api/user/
     * @apiName CreateUser
     * 
     * @apiParam {Object} data
     * @apiParam {String} name
     * @apiParam {String} dob
     * @apiParam {String} description
     * @apiParam {String} addressName
     * @apiParam {Number} latitude
     * @apiParam {Number} longitude
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
    add: async (req: Request, res: Response) => {
        let data = req.body.data;
        let name = data.name;
        let dob = data.dob;
        let description = data.description;
        let addressName = data.addressName;
        let latitude = data.latitude;
        let longitude = data.longitude;

        // var regEx = /^\d{4}-\d{2}-\d{2}$/;
        // if (!dob.match(regEx)) {
        //     return res.json({msg: 'INVALID_DATE_OF_BIRTH', data: {}}).status(200);
        // }

        try {
            let addRes = await User.create({
                name,
                dob,
                description,
                address: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }
            });
    
            return res.json({msg: 'created user successfully.', data: {_id: addRes._id}}).status(200);
            
        } catch (e) {
            return res.json({msg: 'CREATE_FAILURE', data: {err: e}}).status(500);
        }
    },

    /**
     * get user by _id
     * @api GET /api/user/1
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
    get: async (req: Request, res: Response) => {
        let _id = req.params.id;

        try {
            let userRes = await User.findById(_id);
            return res.json({msg: 'get user successfully.', data: {user: userRes}}).status(200);
        } catch (e) {
            return res.json({msg: 'GET_FAILURE', data: {_id: _id, e: e}}).status(500);
        }
    },

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
     * @apiParam {String} addressName
     * @apiParam {Number} latitude
     * @apiParam {Number} longitude
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
    update: async (req: Request, res: Response) => {
        let _id = req.params.id;

        let data = req.body.data;
        let name = data.name;
        let dob = data.dob;
        let description = data.description;
        let addressName = data.addressName;
        let latitude = data.latitude;
        let longitude = data.longitude;

        try {
            let updateRes = await User.findByIdAndUpdate({_id: _id}, {
                name: name,
                dob: dob,
                description: description,
                addressName: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }
            });
    
            res.json({msg: 'updated user successfully.', data: {}}).status(200);
        } catch (e) {
            res.json({msg: 'UPDATE_FAILURE', data: {}}).status(500);
        }
    },

    /**
     * delete user
     * @api POST /api/user/1
     * @apiName DeleteUser
     */
    delete: async (req: Request, res: Response) => {
        let _id = req.params._id;

        try {
            let deleteRes = await User.findByIdAndDelete({_id: req.params.id});
            res.json({msg: 'delete the user successfully.', data: {}}).status(200);
        } catch (e) {
            res.json({msg: 'DELETE_FAILURE', data: {}}).status(500);
        }

    },

    /**
     * get nearby users
     * @api POST /api/user/nearby/1
     * @apiName GetNearbyUsers
     * 
     * @apiParam {Object} data
     * @apiParam {String} distance
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
     *     "msg": "CREATE_FAILURE",
     *     "data": {
     *       "e": ""
     *     }
     *   }
     */
    getNearbyUsers: async (req: Request, res: Response) => {
        // get current user's geolocation
        let _id = req.params.id;
        let maxDistance = req.body.data.maxDistance;

        try {
            let userRes = await User.findById(_id);

            if (userRes !== null) {

                let nearbyUserRes = await User.find({
                    address: {
                        $near: {
                            $maxDistance: maxDistance,
                            $geometry: {
                                type: "Point",
                                coordinates: userRes.address.coordinates
                            }
                        }
                    }
                });

                return res.json({msg: 'get nearby users', data: {nearby_users: nearbyUserRes}}).status(200);
            }
        } catch (e) {
            return res.json({msg: 'GET_NEARBY_USER_FAILURE', data: {e: e}}).status(500);
        }
    }
}