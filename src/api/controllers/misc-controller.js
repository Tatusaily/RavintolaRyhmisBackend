import { listToppingsWithAllergens, listAllSizes } from "../models/misc-model.js";

const getToppings = async (req, res) => {
  res.json(await listToppingsWithAllergens());
};

const getSizes = async (req, res) => {
  res.json(await listAllSizes());
};

export { getToppings, getSizes };
