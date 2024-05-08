import express from 'express';
import pizzaRouter from './routes/pizza-router.js';
import userRouter from './routes/user-router.js';
import miscRouter from './routes/misc-route.js';

const router = express.Router();

router.use('/pizzas', pizzaRouter);
router.use('/users', userRouter);
router.use('/misc', miscRouter);

export default router;
