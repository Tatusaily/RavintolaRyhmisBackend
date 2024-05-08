import express from 'express';
import {
  getAllPizzas,
  getPizzaById,
  putPizza,
  deletePizza,
  postPizza
} from '../controllers/pizza-controller.js';

const pizzaRouter = express.Router();

pizzaRouter.route('/')
  .get(getAllPizzas)
  .post(postPizza);

pizzaRouter.route('/:id')
  .get(getPizzaById)
  .put(putPizza)
  .delete(deletePizza);

export default pizzaRouter;
