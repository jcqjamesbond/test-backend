import express from 'express';
const router = express.Router();

import userController from '../controllers/userController';

// add new user
router.post('/', userController.add);

// router.post('/:id', user);

// get user by _id
router.get('/:id', userController.get);

// delete user by _id
router.delete('/:id', userController.delete);

export = router;