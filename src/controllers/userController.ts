import express, { Request, Response, json } from "express";
import mongoose from "mongoose";
// import {CreateQuery} from 'mongoose';
import User, {IUser} from "../models/user";

// mongoose.connect('mongodb://localhost:27017/test');

export default {
    /**
     * create new user
     */
    add: async (req: Request, res: Response) => {
        let data = req.body.data;
        let name = data.name;
        let dob = data.dob;
        let description = data.description;
        let addressName = data.addressName;
        let latitude = data.latitude;
        let longitude = data.longitude;
        
        try {
            let addRes = await User.create({
                name,
                dob,
                description,
                address: {
                    name: addressName,
                    coordinates: [latitude, longitude]
                }
            });
    
            return res.json({msg: 'created user successfully.', data: {_id: addRes._id}}).status(200);
        } catch (e) {
            return res.json({msg: 'creating user failed.', data: {err: e}}).status(200);
        }
    },

    /**
     * get user by _id
     */
    get: async (req: Request, res: Response) => {
        let _id = req.params.id;

        try {
            let userRes = await User.findById(_id);
            return res.json({msg: '', data: {user: userRes}}).status(200);
        } catch (e) {
            return res.json({msg: 'cannot find user by _id', data: {_id: _id}});
        }
    },

    /**
     * update user
     */
    update: async (req: Request, res: Response) => {
        let _id = req.params.id;

        let data = req.body.data;
        let name = data.name;
        let dob = data.dob;
        let description = data.description;
        let addressName = data.addressName;
        let latitude = -72;
        let longitude = 21;

        try {
            let updateRes = await User.findByIdAndUpdate({_id: _id}, {
                name: name,
                dob: dob,
                description: description,
                addressName: {
                    name: addressName,
                    coordinates: [latitude, longitude]
                }
            });
    
            res.json({msg: 'updated user successfully.', data: {}});
        } catch (e) {
            res.json({msg: 'updating user failed.', data: {}});
        }
    },

    /**
     * delete user
     */
    delete: async (req: Request, res: Response) => {
        let ans = await User.findByIdAndDelete({_id: req.params.id});

        res.json(ans);
    },

    /**
     * get nearby users
     */
    getNearbyUsers: async (req: Request, res: Response) => {

    }
}