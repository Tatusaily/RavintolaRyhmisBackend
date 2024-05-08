import promisePool from "../../utils/database.js";

const listAllToppings = async () => {
  const [rows] = await promisePool.query('SELECT id, name FROM topping');
  return rows;
};
const listToppingsWithAllergens = async () => {
  const [rows] = await promisePool.query('SELECT id, name FROM topping');
  const promiseArray = rows.map((row) => {
    let allergens = promisePool.query(`
        SELECT allergens.allergen
        FROM allergens
        INNER JOIN topping_allergens
        ON allergens.id = topping_allergens.allergen_id
        WHERE topping_allergens.topping_id = ?`, [row.id])
      .then(([allergens]) => {
        let allergenList = [];
        for (let allergen of allergens) {
          allergenList.push(allergen.allergen);
        }
        row.allergens = allergenList;
      });
    return allergens;
  });
  const values = await Promise.all(promiseArray);
  return rows;
};

export { listToppingsWithAllergens };
