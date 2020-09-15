import moment from 'moment';
import pool from '../database/pool';
import { errorMessage, status, successMessage } from '../helpers/status';
import { isEmpty, dateIsPast } from '../helpers/validations';



/**
 * Add a new Trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const addNewTrip = async (req, res) => {
    const { name, origin, destination, date } = req.body;
    const { uniqueId } = req.params;

    if (isEmpty(name) || isEmpty(origin) || isEmpty(destination) || isEmpty(date)) {
        errorMessage.error = 'Name, origin, destination and date fields cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    if (isNaN(Date.parse(date)) || dateIsPast(Date.parse(date))) {
        errorMessage.error = 'Invalid Date - either not a date or date given is in the past';
        return res.status(status.bad).send(errorMessage);
    }

    const tripDate = moment(Date.parse(date));
    const insertQuery = `INSERT INTO trips (user_id, trip_name, trip_from, trip_to, trip_date) VALUES (
        $1, $2, $3, $4, $5
    ) RETURNING *`;
    const values = [
        uniqueId,
        name,
        origin,
        destination,
        tripDate
    ];

    try {
        const { rows } = await pool.query(insertQuery, values);
        const response = rows[0];
        successMessage.data = response;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        errorMessage.error = error;
        return res.status(status.bad).send(errorMessage);
    }
}


/**
 * Get trips
 * @param {Request} req,
 * @param {Response} res
 * @returns {object} reflection object
 */
const getAllTrips = async (req, res) => {
    const { uniqueId } = req.params;
    const fetchQuery = `SELECT * FROM trips WHERE user_id=$1`;
    const values = [uniqueId];

    try {
        const { rows, rowCount } = await pool.query(fetchQuery, values);
        if (rowCount === 0) {
            errorMessage.error = 'No results found';
            return res.status(status.nocontent).send(errorMessage);
        }

        const response = rows;
        successMessage.data = response;
        successMessage.count = rowCount;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = error;
        return res.status(status.bad).send(errorMessage);
    }
}

/**
 * Get Specific Trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const getSpecificTrip = async (req, res) => {
    const { tripId, uniqueId } = req.params;
    const fetchQuery = `SELECT * FROM trips WHERE id=$1 AND user_id = $2`;
    const values = [tripId, uniqueId];

    try {
        const { rows, rowCount } = await pool.query(fetchQuery, values);
        if (rowCount === 0) {
            errorMessage.error = 'Trip not found';
            return res.status(status.notfound).send(errorMessage);
        }

        const response = rows[0];
        successMessage.data = response;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = error;
        return res.status(status.bad).send(errorMessage);
    }
}

/**
 * Update Specific Trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const updateTrip = async (req, res) => {
    const { uniqueId, tripId } = req.params;
    const { name, origin, destination, completed, date } = req.body;

    if (isEmpty(name) || isEmpty(origin) || isEmpty(destination) || isEmpty(date)) {
        errorMessage.error = 'Name, origin, destination and date fields cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    if (isNaN(Date.parse(date))) {
        errorMessage.error = 'Invalid Date';
        return res.status(status.bad).send(errorMessage);
    }

    const tripDate = moment(Date.parse(date));

    const updateQuery = `UPDATE trips 
    SET trip_name=$1, trip_from=$2, trip_to=$3, completed=$4, trip_date=$5 
    WHERE id=$6 AND user_id=$7 RETURNING *`;
    const values = [name, origin, destination, completed, tripDate, tripId, uniqueId];

    try {
        const { rows } = await pool.query(updateQuery, values);
        const response = rows[0];
        successMessage.data = response;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = error;
        return res.status(status.bad).send(errorMessage);
    }
}

/**
 * Delete Trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const deleteTrip = async (req, res) => {
    const { tripId } = req.params;
    const deleteQuery = `DELETE FROM trips WHERE id=$1 RETURNING id, user_id`;
    const values = [tripId];
    try {
        const { rows, rowCount } = await pool.query(deleteQuery, values);
        if (rowCount === 0) {
            errorMessage.error = 'No records changed';
            return res.status(status.bad).send(errorMessage);
        }

        const response = rows[0];
        successMessage.data = response;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = error;
        return res.status(status.bad).send(errorMessage);
    }
}

export {
    addNewTrip,
    getAllTrips,
    getSpecificTrip,
    updateTrip,
    deleteTrip
}