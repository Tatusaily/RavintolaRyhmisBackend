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
   rows.forEach( async (row) => {
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
   const [rows] = await promisePool.query('SELECT * FROM pizza');
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
const {/*PIZZA ATTRIBUTES HERE*/} = pizza;
  const sql = `INSERT INTO pizza (/*ROW NAMES HERE*/)
               VALUES (?, ?, ?, ?, ?)`;
               
  const params = [/* FROM LINE 52 */];
  console.log('sql', params);
    const rows = await promisePool.execute(sql, params);
    console.log('rows', rows);
     if (rows[0].affectedRows === 0) {
        return false;
     }
     return ("Pizza added");
};

/**
 * Modify pizza object in database
 * @param {*} pizza pizza object to put in database
 * @param {*} id id of the pizza to modify
 * @returns FALSE or "success"
*/
const modifyPizza = async (pizza, id) => {
   const sql = promisePool.format(`UPDATE pizza SET ? WHERE pizza_id = ?`, [pizza, id]);
   const rows = await promisePool.execute(sql);
   console.log('rows', rows);
   if (rows[0].affectedRows === 0) {
      return false;
   }
   return {message: 'success'};
};

/**
 * Remove pizza from database
 * @param {*} id id of the pizza to remove
 * @returns FALSE or "success"
*/
const removePizza = async (id) => {
   const [rows] = await promisePool.execute('DELETE FROM cats WHERE cat_id = ?', [id]);
   console.log('rows', rows);
   if (rows.affectedRows === 0) {
      return false;
   }
   return {message: 'success'};
};

export {listAllDefaultPizzas, findPizzaById, addPizza, modifyPizza, removePizza, listAllPizzas};