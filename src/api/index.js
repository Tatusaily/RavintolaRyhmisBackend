import express from 'express';
import pizzaRouter from './routes/pizza-router.js';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';

const router = express.Router();

router.use('/pizzas', pizzaRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
