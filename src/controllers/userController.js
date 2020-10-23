import {errorMessage, status, successMessage} from '../helpers/status';
import {isEmpty, isValidEmail} from '../helpers/validations';
import pool from '../database/pool';

/**
 * Create User function for POST request
 * @param {Request} req 
 * @param {Response} res
 * @returns {object} reflection object
 */
const createUser = async (req, res) => {
    const {uid, firstName, lastName, email, username} = req.body;

    if(isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(username) || isEmpty(uid)) {
        errorMessage.msg = 'Single/Multiple fields are empty';
        return res.status(status.error).send(errorMessage);
    }

    if(!isValidEmail(email)) {
        errorMessage.msg = 'Email invalid';
        return res.status(status.bad).send(errorMessage);
    }

    const values = [uid, firstName, lastName, email, username];

    const query = 'INSERT INTO users ' +
        '(uid, firstname, lastname, email, username) VALUES ' +
        '($1,$2,$3,$4,$5) RETURNING uid';

    try {
        const {rows} = await pool.query(query, values);
        successMessage.data = rows[0];
        return res.status(status.created).send(successMessage);
    }catch(error) {
        console.log(error);
        if(error.routine === '_bt_check_unique') {
            errorMessage.msg = error.detail;
            return res.status(status.conflict).send(errorMessage);
        }

        errorMessage.msg = error;
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Get User
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const getUser = async (req, res) => {
    const {userId} = req.params;

    const query = 'SELECT * FROM users WHERE uid=$1';
    const values = [userId];

    try {
        const {rows, rowCount} = await pool.query(query, values);
        if(rowCount === 0) {
            errorMessage.msg = 'No user returned';
            return res.status(status.notfound).send(errorMessage);
        }

        successMessage.data = rows[0];
        return res.status(status.success).send(successMessage);
    } catch (e){
        errorMessage.msg = e;
        return res.status(status.bad).send(errorMessage);
    }
}

/**
 * Update User
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const updateUser = async (req, res) => {
    const {firstName, lastName, email, username} = req.body;
    const {userId} = req.params;
    const query = `UPDATE users SET firstname=$1, lastname=$2, email=$3, username=$4 WHERE uid=$5 RETURNING uid`;
    const values = [firstName, lastName, email, username, userId];

    try {
        const {rows, rowCount} = await pool.query(query, values);
        if(rowCount === 0) {
            errorMessage.msg = 'Updated nothing';
            return res.status(status.bad).send(errorMessage);
        }

        successMessage.data = rows[0];
        return res.status(status.success).send(successMessage);
    }catch(error) {
        if(error.routine === '_bt_check_unique') {
            errorMessage.msg = error.detail;
            return res.status(status.conflict).send(errorMessage);
        }

        errorMessage.msg = error;
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Delete user
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const deleteUser = async (req, res) => {
    const {userId} = req.params;

    const query = `DELETE FROM users WHERE uid=$1 RETURNING uid`;
    const values = [userId];

    try {
        const {rows, rowCount} = await pool.query(query, values);
        if(rowCount === 0) {
            errorMessage.msg = 'Nothing was deleted';
            return res.status(status.bad).send(errorMessage);
        }

        successMessage.data = rows[0];
        return res.status(status.success).send(successMessage);
    } catch(e) {}

}

export {
    createUser,
    getUser,
    updateUser,
    deleteUser
}
