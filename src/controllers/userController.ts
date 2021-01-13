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
     * @apiParam {Number} latitude
     * @apiParam {Number} longitude
     * 
     * @apiSuccessExample Success-Response
     *   HTTP/1.1 200 OK
     *   {
     *     "msg": "CREATE_USER_SUCCESS",
     *     "data": {
     *       "_id": "uiocweryf92eh8ou"
     *     }
     *   }
     * 
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 500 Internal Server Error
     *   {
     *     "msg": "CREATE_USER_FAILURE",
     *     "data": {
     *       "e": ""
     *     }
     *   }
     */
    add: async (req: Request, res: Response) => {
        let data = req.body.data;
        let name = data.name;
        let dob = data.dob;
        let description = data.description;
        let latitude = data.latitude;
        let longitude = data.longitude;

        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dob.match(regEx)) {
            return res.json({msg: 'INVALID_DATE_OF_BIRTH', data: {}}).status(200);
        }

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
    
            return res.status(200).json({msg: 'CREATE_USER_SUCCESS', data: {_id: addRes._id}});
            
        } catch (e) {
            return res.status(500).json({msg: 'CREATE_USER_FAILURE', data: {err: e}});
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
     *     "msg": "GET_USER_SUCCESS",
     *     "data": {
     *       "user": {
     *          "name": "",
     *          "description": "",
     *          "dob": "1990-01-01",
     *          "createdAt": "",
     *          "address": {
     *              "type": "Point",
     *              "coordinates": []
     *          }
     *        }
     *     }
     *   }
     * 
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 500 Internal Server Error
     *   {
     *     "msg": "GET_USER_FAILURE",
     *     "data": {
     *       "_id": ""
     *     }
     *   }
     */
    get: async (req: Request, res: Response) => {
        let _id = req.params.id;

        try {
            let userRes = await User.findById(_id);

            if (userRes === null) {
                return res.status(200).json({msg: 'INVALID_ID', data: {}});
            } else {
                return res.status(200).json({msg: 'GET_USER_SUCCESS', data: {user: userRes}});
            }
            
        } catch (e) {
            return res.status(500).json({msg: 'GET_USER_FAILURE', data: {e: e}});
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
     * @apiParam {Number} latitude
     * @apiParam {Number} longitude
     * 
     * @apiSuccessExample Success-Response
     *   HTTP/1.1 200 OK
     *   {
     *     "msg": "UPDATE_USER_SUCCESS",
     *     "data": {
     *       "_id": ""
     *     }
     *   }
     * 
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 500 Internal Server Error
     *   {
     *     "msg": "UPDATE_USER_FAILURE",
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
            }, {new: true});
    
            res.status(200).json({msg: 'UPDATE_USER_SUCCESS', data: {user: updateRes}});
        } catch (e) {
            res.status(500).json({msg: 'UPDATE_USER_FAILURE', data: {e: e}});
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
            res.status(200).json({msg: 'DELETE_USER_SUCCESS', data: {}});
        } catch (e) {
            res.status(500).json({msg: 'DELETE_USER_FAILURE', data: {e: e}});
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
     *     "msg": "GET_NEARBY_USER_SUCCESS",
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
    getNearbyUsers: async (req: Request, res: Response) => {
        // get current user's geolocation
        let _id = req.params.id;
        let maxDistance = req.body.data.maxDistance ? req.body.data.maxDistance : 1000;

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

                return res.status(200).json({msg: 'GET_NEARBY_USER_SUCCESS', data: {nearby_users: nearbyUserRes}});
            }
        } catch (e) {
            return res.status(500).json({msg: 'GET_NEARBY_USER_FAILURE', data: {e: e}});
        }
    }
}