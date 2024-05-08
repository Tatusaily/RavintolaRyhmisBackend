import promisePool from "../../utils/database.js";

const listAllUsers = async () => {
    const [rows] = await promisePool.query('SELECT * FROM user');
    console.log('rows', rows);
    return rows;
};

const findUserById = async (id) => {
    const [rows] = await promisePool.execute('SELECT * FROM user WHERE user_id = ?', [id]);
    console.log('rows', rows);
    if (rows.length === 0) {
        return false;
    }
    return rows[0];
};

const addUser = async (user) => {
    const {name, username, email, role, password} = user;
    const sql = `INSERT INTO user (name, username, email, role, password)
                 VALUES (?, ?, ?, ?, ?)`;
    const params = [name, username, email, role, password];
    const rows = await promisePool.execute(sql, params);
    console.log('rows', rows);
    if (rows[0].affectedRows === 0) {
        return false;
    }
    return {user_id: rows[0].insertId};
};

const modifyUser = async (user, id) => {
    const sql = promisePool.format(`UPDATE user SET ? WHERE user_id = ?`, [user, id]);
    const rows = await promisePool.execute(sql);
    console.log('rows', rows);
    if (rows[0].affectedRows === 0) {
        return false;
    }
    return {message: 'success'};
}

const removeUser = async (id) => {
    const connection = await promisePool.getConnection();

    try{
        // Remove user's cats before removing the user
        await connection.beginTransaction();
        await connection.execute('DELETE FROM cats WHERE owner = ?', [id]);
        const sql = connection.format('DELETE FROM users WHERE user_id = ?', [id]);
        const [rows] = await connection.execute(sql);
        console.log('rows', rows);
        if (rows.affectedRows === 0) {
            return {message: 'User not found'};
        }
        await connection.commit();
        return {message: 'success'};

    } catch (e) {
        await connection.rollback();
        console.error('ROLLBACK', e.message);
        return false;

    } finally {
        connection.release();
    }
}

const findPizzasByUserID = async (id) => {
    console.log('id', id);
    const [rows] = await promisePool.execute('SELECT * FROM cats WHERE owner = ?', [id]);
    console.log('rows', rows);
    return rows;
};

const login = async (user) => {
  try {
    const sql = `SELECT *
                 FROM user
                 WHERE username = ?`;
    const [rows] = await promisePool.execute(sql, [user.username]);
    return rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export {login, listAllUsers, findUserById, addUser, modifyUser, removeUser, findPizzasByUserID};
