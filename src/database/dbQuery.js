import pool from './pool';

/**
 * Insert into users
 * @param {Array} values
 * @returns {object} reflection object
 */
const insertUser = async values => {
    const query = 'INSERT INTO users ' +
        '(firstname, lastname, email, username, password) VALUES' +
        '($1,$2,$3,$4,$5) RETURNING *';
    try{
        const {rows, rowCount} = await pool.query(query, values);
        return {"rows":rows, "rowCount":rowCount};
    } catch(e) {
        return {"error":e};
    }
};

/**
 * Get user from values
 * @param {Array} values
 * @param {String} key
 * @returns {object} reflection object
 */
const getUserByVal = async (values, key) => {
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
};

/**
 * Update a user
 * @param {Array} values
 * @param {String[]} key
 * @returns {object} reflection object
 */
const updateUserByKeys = async (values, key) => {

};

/**
 * Get all trips
 * @param {Array} values
 * @param {String} key
 * @returns {object} reflection object
 */
const findAllTrips = async (values, key) => {
    let query = 'SELECT * FROM trips WHERE';
    if(key === 'userId') {
        query += ' "userId" = $1';
    } else if (key === 'id') {
        query += ' "tripId" = $1';
    }

    try {
        const {rows, rowCount} = await pool.query(query, values);
        return {"rows":rows, "rowCount":rowCount};
    } catch(e) {
        return {"error": e};
    }
};

/**
 * Insert new trip
 * @param {Array} values
 * @returns {object} reflection object
 */
const insertTrip = async values => {
    const query = 'INSERT INTO trips ' +
        '("userId", name, origin, destination, tripDate) VALUES' +
        '($1, $2, $3, $4, $5) RETURNING *';
    try {
        const {rows, rowCount} = await pool.query(query, values);
        return {"rows":rows, "rowCount": rowCount};
    }catch(e) {
        return {"error":e};
    }
};

export {
    insertUser,
    getUserByVal,
    updateUserByKeys,
    findAllTrips,
    insertTrip
}
