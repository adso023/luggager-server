import {errorMessage, status, successMessage} from '../helpers/status';
import {isEmpty, isValidEmail} from '../helpers/validations';
import pool from '../database/pool';
import {hash, compare} from 'bcrypt';
import {getUserByVal, insertUser} from '../database/dbQuery';
import {sign, verify} from 'jsonwebtoken';
import environ from '../../env';

/**
 * Create User function for POST request
 * @param {Request} req 
 * @param {Response} res
 * @returns {object} reflection object
 */
const createUser = async (req, res) => {
    const {firstName, lastName, email, username, password} = req.body;

    if(isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(username) || isEmpty(password)) {
        errorMessage.msg = 'Single/Multiple fields are empty';
        return res.status(status.error).send(errorMessage);
    }

    if(!isValidEmail(email)) {
        errorMessage.msg = 'Email invalid';
        return res.status(status.bad).send(errorMessage);
    }

    if((await getUserByVal([email], 'email').rows) === undefined
        || (await getUserByVal([username], 'username')).rows === undefined) {
        errorMessage.msg = "Duplicate user found";
        return res.status(status.bad).send(errorMessage);
    }

    const hashedPassword = await hash(password, 10);
    const values = [firstName, lastName, email, username, hashedPassword];
    const {rows, rowCount, error} = await insertUser(values);

    if(error) {
        errorMessage.msg = error;
        return res.status(status.error).send(errorMessage);
    }
    if(rowCount === 0){
        errorMessage.msg = "User not created";
        return res.status(status.error).send(errorMessage);
    } else {
        const token = sign({id: rows[0]['id']}, environ.secret);
        successMessage.data = rows[0];
        successMessage.token = token;
        return res.status(status.created).send(successMessage);
    }
};


/**
 * Login user
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const login = async (req, res) => {
    const {email, username, password} = req.body;

    if((await getUserByVal(
        [(email === undefined) ? username : email],
        (email === undefined) ? 'username' : 'email')).rows === undefined) {
        errorMessage.msg = 'No user with email or username found';
        return res.status(status.notfound).send(errorMessage);
    }

    const {rows, rowCount, error} = await getUserByVal(
        (email === undefined) ? [username] : [email],
        (email === undefined) ? 'username' : 'email'
    );

    if(error){
        errorMessage.msg = error;
        return res.status(status.bad).send(errorMessage);
    } else {
        const compared = await compare(password, rows[0]['password']);
        if(!compared) {
            errorMessage.msg = 'Invalid credentials';
            return res.status(status.unauthorized).send(errorMessage);
        }
        const token = sign({id: rows[0]['id']}, environ.secret);
        successMessage.data = rows[0];
        successMessage.token = token;
        return res.status(status.success).send(successMessage);
    }
};

/**
 * Get User
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const getUser = async (req, res) => {
    const token = req.token;
    verify(token, environ.secret, async (err, data) => {
        if(err) {
            errorMessage.msg = 'Unauthorized - Invalid token';
            return res.status(status.unauthorized).send(errorMessage);
        } else {
            const userId = data.id;
            const {rows, rowCount, error} = await getUserByVal([userId], 'id');
            if(error) {
                errorMessage.msg = error;
                return res.status(status.error).send(errorMessage);
            } else {
                successMessage.data = rows[0];
                return res.status(status.success).send(successMessage);
            }
        }
    });
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
    login,
    getUser,
    updateUser,
    deleteUser
}
