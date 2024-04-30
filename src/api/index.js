import express from 'express';
import pizzaRouter from './routes/pizza-router.js';
import userRouter from './routes/user-router.js';

const router = express.Router();

router.use('/pizzas', pizzaRouter);
router.use('/users', userRouter);

export default router;