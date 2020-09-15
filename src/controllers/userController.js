import moment from 'moment';

import { status, errorMessage, successMessage } from '../helpers/status';

import { isEmpty, isValidEmail } from '../helpers/validations';
import pool from '../database/pool';

/**
 * Create User function for POST request
 * @param {Request} req 
 * @param {Response} res
 * @returns {object} reflection object
 */
const createUser = async (req, res) => {
    const { email, first_name, last_name, unique_id } = req.body;
    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name)) {
        errorMessage.error = 'Email, password, first name and last name field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid email';
        return res.status(status.bad).send(errorMessage);
    }

    const createNewUser = `INSERT INTO users (
        first_name, last_name, email, created_on, unique_id
    ) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const current = moment(new Date());
    const values = [first_name, last_name, email, current, unique_id];

    try {
        const { rows } = await pool.query(createNewUser, values)
        const response = rows[0];
        successMessage.data = response;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        console.log(error);
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = `Email (${email}) already exists`;
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.bad).send(errorMessage);
    }

};

/**
 * Get User
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const getUser = async (req, res) => {
    const { uniqueId } = req.params;

    const fetchQuery = `SELECT * FROM users WHERE unique_id = $1`;
    const values = [uniqueId];
    try {
        const { rows, rowCount } = await pool.query(fetchQuery, values);
        if (rowCount === 0) {
            errorMessage.error = "User doesn't exist";
            return res.status(status.bad).send(errorMessage);
        }
        const response = rows[0];
        successMessage.data = response;
        return res.status(status.success).send(successMessage);
    } catch (err) {

    }
    return res.status(status.nocontent).send('No content yet');
}

/**
 * Update User
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const updateUser = async (req, res) => {
    const { email, first_name, last_name } = req.body;
    const { uniqueId } = req.params;
    if (isEmpty(email)) {
        errorMessage.error = 'Email field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    if (!isValidEmail(email)) {
        errorMessage.error = 'Invalid email address';
        return res.status(status.bad).send(errorMessage);
    }

    const updateQuery = `UPDATE users SET email = $1, first_name = $2, last_name = $3 WHERE unique_id = $4 RETURNING *`;
    const values = [email, first_name, last_name, uniqueId];

    try {
        const { rows } = await pool.query(updateQuery, values);
        const response = rows[0];
        successMessage.data = response;
        return res.status(status.success).send(response);
    } catch (error) {
        console.error(error);
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'Email already exists';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.bad).send(errorMessage);
    }
};

/**
 * Delete user
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const deleteUser = async (req, res) => {
    const { uniqueId } = req.params;

    const deleteQuery = `DELETE FROM users WHERE unique_id=$1 RETURNING unique_id, id`;
    const values = [uniqueId];

    try {
        const { rows } = await pool.query(deleteQuery, values);
        const response = rows[0];
        successMessage.data = response;
        successMessage.data.msg = 'Row deleted successfully';
        return res.status(status.success).send(successMessage);
    } catch (err) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.bad).send(errorMessage);
    }
}

export {
    createUser,
    getUser,
    updateUser,
    deleteUser
}