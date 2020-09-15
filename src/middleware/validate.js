import pool from '../database/pool';
import { errorMessage, status, successMessage } from '../helpers/status';

/**
 * Validate that user id exists
 * @param {Request} req
 * @param {Response} res
 * @param {object} next
 * @returns {object | void} response object 
 */
const validateUser = async (req, res, next) => {
    const { uniqueId } = req.params;

    const findQuery = `SELECT id FROM users WHERE unique_id=$1`;
    const values = [uniqueId];
    try {
        const { rowCount } = await pool.query(findQuery, values);
        if (rowCount === 0) {
            errorMessage.error = "User doesn't exist check your unique Id";
            return res.status(status.unauthorized).send(errorMessage);
        } else if (rowCount >= 2) {
            errorMessage.error = 'Database error - multiple users with similar unique Id';
            return res.status(status.unauthorized).send(errorMessage);
        }
        next();
    } catch (error) {
        errorMessage.error = error;
        return res.status(status.unauthorized).send(errorMessage);
    }
}

/**
 * Validate that a trip exists
 * @param {Request} req
 * @param {Response} res
 * @param {object} next
 * @returns {object | void} response object
 */
const validateTrip = async (req, res, next) => {
    const { uniqueId, tripId } = req.params;
    const findQuery = `SELECT id FROM trips WHERE id=$1 AND user_id=$2`;
    const values = [tripId, uniqueId];
    try {
        const { rowCount, rows } = await pool.query(findQuery, values);
        if (rowCount === 0) {
            errorMessage.error = 'Trip not found';
            return res.status(status.notfound).send(errorMessage);
        } else if (rowCount >= 2) {
            errorMessage.error = 'Multiple trip ids found';
            return res.status(status.conflict).send(errorMessage);
        }
        next();
    } catch (error) {
        errorMessage.error = error;
        return res.status(status.notfound).send(errorMessage);
    }
}

export {
    validateUser,
    validateTrip
};