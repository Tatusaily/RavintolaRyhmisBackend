import {listAllDefaultPizzas, listAllPizzas, findPizzaById, addPizza, modifyPizza, removePizza} from "../models/pizza-model.js";

const getPizzas = async (req, res) => {
  res.json(await listAllDefaultPizzas());
};

const getAllPizzas = async (req, res) => {
  res.json(await listAllPizzas());
};

const getPizzaById = async (req, res) => {
  const cat = await findPizzaById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postPizza = async (req, res) => {
  const result = await addPizza(req.body, req.file);
  if (result.id) {
    res.status(201);
    res.json({message: 'New pizza added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putPizza = async (req, res) => {
  const result = await modifyPizza(req.body, req.params.id);
  res.sendStatus(200);
  res.json({message: 'Cat item updated.', result});
};

const deletePizza = async (req, res) => {
  // nää oli jossain tehtävässä hyvin
  const result = await removePizza(req.params.id);
  res.sendStatus(200);
  res.json({message: 'Cat item deleted.', result});
};

export {getAllPizzas, getPizzas, getPizzaById, postPizza, putPizza, deletePizza};