import pool from './pool';

/**
 * Insert into users
 * @param {Array} values
 * @returns {object} reflection object
 */
async function insertUser(values) {
    const query = 'INSERT INTO users ' +
        '(firstname, lastname, email, username, password) VALUES' +
        '($1,$2,$3,$4,$5) RETURNING *';
    try{
        const {rows, rowCount} = await pool.query(query, values);
        return {"rows":rows, "rowCount":rowCount};
    } catch(e) {
        return {"error":e};
    }
}

/**
 * Get user from values
 * @param {Array} values
 * @param {String} key
 * @returns {object} reflection object
 */
async function getUserByVal(values, key) {
    let query = `SELECT * FROM users WHERE `;
    if(key === 'email') {
        query += 'email=$1';
    } else if (key === 'username') {
        query += 'username=$1';
    } else if (key === 'id') {
        query += 'id=$1';
    }
    try{
        const {rows, rowCount} = await pool.query(query, values);
        if (rowCount === 0)
            return {"error": "User not found"};
        return {"rows":rows, "rowCount":rowCount};
    }catch(e){
        return {"error":e};
    }
}

/**
 * Update a user
 * @param {Array} values
 * @param {String[]} key
 * @returns {object} reflection object
 */
async function updateUserByKeys(values, key) {

}

export {
    insertUser,
    getUserByVal,
    updateUserByKeys
}
