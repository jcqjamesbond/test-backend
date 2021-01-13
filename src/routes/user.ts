import express from 'express';
const router = express.Router();

import userController from '../controllers/userController';

// add new user
router.post('/', userController.add);

// get user by _id
router.get('/:id', userController.get);

// update user by _id
router.post('/:id', userController.update);

// delete user by _id
router.delete('/:id', userController.delete);

// get nearby users
router.post('/nearby/:id', userController.getNearbyUsers);

export = router;