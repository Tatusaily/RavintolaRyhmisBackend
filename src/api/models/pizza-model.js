// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';


/**
 * List all default pizzas
 * PLACEHOLDER DO NOT USE
 * @returns {Promise} Promise object represents the list of all default pizzas
*/
const listAllDefaultPizzas = async () => {
  const [rows] = await promisePool.query('SELECT * FROM pizza where user_id = 1');
  rows.forEach(async (row) => {
    //console.log("Getting cat owner")
    let owner = await promisePool.query('SELECT * FROM users where id = ?', [row.owner]);
    owner = owner[0][0].name;
    //console.log(`${row.cat_name} owner is ${owner}`);
  });
  return rows;
};

/**
 * List all pizzas from the entire DB
*/
const listAllPizzas = async () => {
   const [rows] = await promisePool.query(`SELECT pizza.id, pizza.name, pizza.price FROM pizza`)
   .then (async (rows) => {
      rows.forEach( async (row) => {
         const [result] = await promisePool.query(`SELECT topping.name FROM topping INNER JOIN pizza_topping ON topping.id = pizza_topping.topping_id WHERE pizza_topping.pizza_id = ?`, [row.id]);
         row.ingredients = result;
      });
   });
   return rows;
};

/**
 * Find pizza by id
 * @param {*} id
 * @returns {Promise} Promise object represents the pizza object
*/
const findPizzaById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM pizza WHERE id = ?', [id]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

/**
 * Add pizza object and file to database
 * PLACEHOLDER DO NOT USE
 * @param {*} pizza
 * @param {*} user_id
 * @returns FALSE or "Pizza added"
 */

const addPizza = async (pizza, user_id) => {
  x
  const { name, toppings, price } = pizza;
  const sql = `INSERT INTO pizza (name, price, show_on_menu)
               VALUES (?, ?, ?)`;

  const params = [name, price, 0];
  console.log('sql', params);
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  let sql2 = `INSERT INTO user_pizza (user_id, pizza_id)
              VALUES (?, ?)`;
  let params2 = [user_id, rows[0].insertId];
  console.log('sql2', sql2);
  const rows2 = await promisePool.execute(sql2, params2);
  console.log('rows2', rows2);
  if (rows2[0].affectedRows === 0) {
    return false;
  }

  console.log('toppings', toppings);
  for (let topping of toppings) {
    let sql3 = `INSERT INTO pizza_topping (pizza_id, topping_id)
                VALUES (?, ?)`;
    let params3 = [rows[0].insertId, topping];
    console.log('sql3', sql3);
    const rows3 = await promisePool.execute(sql3, params3);
    console.log('rows3', rows3);
    if (rows3[0].affectedRows === 0) {
      return false;
    }
  }
  return { message: "UserPizza added" };
};

/**
 * Modify pizza object in database
 * @param {*} pizza pizza object to put in database
 * @param {*} id id of the pizza to modify
 * @returns FALSE or "success"
*/
const modifyPizza = async (pizza, id) => {
  // Mitä tehdään kun muokataan pizzaa?
  // Mitä tapahtuu tilaushistorialle?
  const sql = promisePool.format(`UPDATE pizza SET ? WHERE pizza_id = ?`, [pizza, id]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { message: 'success' };
};

/**
 * Remove pizza from database
 * @param {*} id id of the pizza to remove
 * @returns FALSE or "success"
*/
const removePizza = async (id) => {
  // Miten toimii poistaminen? Sen pitää poistaa sit myös user-pizza linkki.
  // Oisko parempi olla käyttämättä?
  // Ettei tuu mitään ongelmia sit et poistaa vahingossa jotain tilaushistoriasta.
  const [rows] = await promisePool.execute('DELETE FROM cats WHERE cat_id = ?', [id]);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return { message: 'success' };
};

export { listAllDefaultPizzas, findPizzaById, addPizza, modifyPizza, removePizza, listAllPizzas };
