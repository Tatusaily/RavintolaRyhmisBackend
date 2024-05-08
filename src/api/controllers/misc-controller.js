import { listToppingsWithAllergens } from "../models/misc-model.js";

const getToppings = async (req, res) => {
  res.json(await listToppingsWithAllergens());
};

export { getToppings };
