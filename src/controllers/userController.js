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
    const {firstName, lastName, email, password, username} = req.body;

    if(isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(password) || isEmpty(username)) {
        errorMessage.msg = 'Single/Multiple fields are empty';
        return res.status(status.error).send(errorMessage);
    }

    if(!isValidEmail(email)) {
        errorMessage.msg = 'Email invalid';
        return res.status(status.bad).send(errorMessage);
    }

    const values = [firstName, lastName, email, password, username];

    const query = 'INSERT INTO users (firstname, lastname, email, password, username) VALUES ($1,$2,$3,$4,$5) RETURNING id';

    try {
        const {rows} = await pool.query(query, values);
        successMessage.data = rows[0];
        return res.status(status.created).send(successMessage);
    }catch(error) {
        if(error.routine === '_bt_check_unique') {
            errorMessage.msg = 'Email already in use';
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
    const {userId} = req.query;

    const query = 'SELECT * FROM users WHERE id=$1';
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
    const query = `UPDATE users SET firstname=$1, lastname=$2, email=$3, username=$4 WHERE id=${userId} RETURNING id`;
    const values = [firstName, lastName, email, username];

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
            errorMessage.msg = 'Email already in use';
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
    const {userId} = req.query;

    const query = `DELETE FROM users WHERE id=${userId} RETURNING id`;

    try {
        const {rows, rowCount} = await pool.query(query);
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