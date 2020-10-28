import pool from './pool';

/**
 * Find if user exists
 * @param {Array} values
 * @param {boolean} check -> true for email and false for username
 * @returns {boolean} result
 */
async function findOneUserEmail(values, check) {
    let query = 'SELECT * FROM users WHERE ';
    if(check) {
        query += 'email=$1';
    } else {
        query += 'username=$1';
    }
    const {rowCount} = await pool.query(query, values);
    return rowCount === 0;
}

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
 * @param {boolean} check
 * @returns {object} reflection object
 */
async function getUserByEmailUsername(values, check) {
    let query = `SELECT * FROM users WHERE `;
    if(check) {
        query += 'email=$1';
    } else {
        query += 'username=$1';
    }
    try{
        const {rows, rowCount} = await pool.query(query, values);
        if (rowCount === 0)
            return {"error": "Invalid credentials"};
        return {"rows":rows, "rowCount":rowCount};
    }catch(e){
        return {"error":e};
    }
}

export {
    findOneUserEmail,
    insertUser,
    getUserByEmailUsername
}
