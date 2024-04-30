// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';

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

const listAllPizzas = async () => {
   const [rows] = await promisePool.query('SELECT * FROM pizza');
   return rows;
};

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
 * @param {*} pizza 
 * @param {*} file 
 * @returns 
 */

const addPizza = async (pizza, file) => {
  const {name, price, owner,birthdate} = cat;
  const filename = file.filename;
  const sql = `INSERT INTO cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
               
  const params = [cat_name, weight, owner, filename, birthdate];
  console.log('sql', params);
    const rows = await promisePool.execute(sql, params);
    console.log('rows', rows);
     if (rows[0].affectedRows === 0) {
        return false;
     }
    return {cat_id: rows[0].insertId};
};

const modifyPizza = async (cat, id) => {
   const sql = promisePool.format(`UPDATE cats SET ? WHERE cat_id = ?`, [cat, id]);
   const rows = await promisePool.execute(sql);
   console.log('rows', rows);
   if (rows[0].affectedRows === 0) {
      return false;
   }
   return {message: 'success'};
};

const removePizza = async (id) => {
   const [rows] = await promisePool.execute('DELETE FROM cats WHERE cat_id = ?', [id]);
   console.log('rows', rows);
   if (rows.affectedRows === 0) {
      return false;
   }
   return {message: 'success'};
};

export {listAllDefaultPizzas, findPizzaById, addPizza, modifyPizza, removePizza, listAllPizzas};