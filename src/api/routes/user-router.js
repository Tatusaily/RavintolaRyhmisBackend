import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  getPizzasByUserID,
} from '../controllers/user-controller.js';
import multer from 'multer';

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E5);
        const uniquePrefix = (req.body.name).replaceAll(/,|-|_|'/gi, '').toLowerCase();
        let extension = file.originalname.split('.').pop(); // Or mimetype?
        if (extension !== ('jpg' || 'jpeg' || 'png' || 'gif')) {
        extension = 'jpg';
        }
    
        const filename = `${uniquePrefix}-${uniqueSuffix}.${extension}`;
        cb(null, filename);
    },
});

const upload = multer({dest: 'uploads/'});

// Get all users and post a new user
userRouter.route('/')
    .get(getUser)
    .post(upload.single("file"), postUser);

// Get, put(update), and delete a user by ID
userRouter.route('/:id')
    .get(getUserById)
    .put(putUser)
    .delete(deleteUser);

// Get all pizzas by user ID
userRouter.route('/:id/pizzas')
    .get(getPizzasByUserID);

export default userRouter;