import express from 'express';
import {
  getUser,
  getUserById,
  putUser,
  postUser,
  deleteUser,
  getPizzasByUserID,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

// Get all users and post a new user
userRouter.route('/')
    .get(getUser)
    .post(postUser);

// Get, put(update), and delete a user by ID
userRouter.route('/:id')
    .get(getUserById)
    .put(putUser)
    .delete(deleteUser);

// Get all pizzas by user ID
userRouter.route('/:id/pizzas')
    .get(getPizzasByUserID);

export default userRouter;
