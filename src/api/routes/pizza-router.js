import express from 'express';
import {
  getAllPizzas,
  getPizzaById,
  putPizza,
  deletePizza
} from '../controllers/pizza-controller.js';

const pizzaRouter = express.Router();

pizzaRouter.route('/')
  .get(getAllPizzas)

pizzaRouter.route('/:id')
  .get(getPizzaById)
  .put(putPizza)
  .delete(deletePizza);

pizzaRouter.route('/user/:id')
  .get(getUserPizzas);

export default pizzaRouter;