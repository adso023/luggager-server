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
    const {name, origin, destination, tripDate} = req.body;
    const {userId} = req.params;

    if (isNaN(Date.parse(tripDate)) || dateIsPast(Date.parse(tripDate))) {
        errorMessage.msg = 'Invalid Date - either not a date or date given is in the past';
        return res.status(status.bad).send(errorMessage);
    }

    const momentDate = moment(Date.parse(tripDate));
    const query = `INSERT INTO trips 
    (userid, name, origin, destination, tripDate) 
    VALUES ($1,$2,$3,$4,$5) RETURNING id, userid`;
    const values = [userId, name, origin, destination, momentDate];

    try {
        const {rows, rowCount} = await pool.query(query, values);
        if(rowCount === 0) {
            return res.status(status.bad).send(errorMessage);
        }
        successMessage.data = rows[0];
        errorMessage.msg = 'Nothing was created';
        return res.status(status.created).send(successMessage);
    } catch(error) {
        /**
         * error.routine: {ExecConstraints, DateTimeParseError}
         */
        errorMessage.msg = error;
        return res.status(status.error).send(errorMessage);
    }
}


/**
 * Get trips
 * @param {Request} req,
 * @param {Response} res
 * @returns {object} reflection object
 */
const getAllTrips = async (req, res) => {
    const {userId} = req.params;
    const query = `SELECT * FROM trips WHERE userid=${userId}`;

    try {
        const {rows, rowCount} = await pool.query(query);

        if(rowCount === 0) {
            errorMessage.msg = 'No content found';
            return res.status(status.notfound).send(errorMessage);
        }

        successMessage.data = rows;
        return res.status(status.success).send(successMessage);
    }catch(error) {
        errorMessage.msg = error;
        return res.status(status.error).send(errorMessage);
    }
}

/**
 * Get Specific Trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const getSpecificTrip = async (req, res) => {
    const {userId, tripId} = req.params;
    const query = `SELECT * FROM trips WHERE id=${tripId} AND userid=${userId}`;

    try{
        const {rows} = await pool.query(query);
        successMessage.data = rows[0];
        return res.status(status.success).send(successMessage);
    }catch(error){
        errorMessage.msg = error;
        return res.status(status.error).send(errorMessage);
    }
}

/**
 * Update Specific Trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const updateTrip = async (req, res) => {
    const {name, origin, destination, tripDate} = req.body;
    const {userId, tripId} = req.params;
    const momentDate = moment(Date.parse(tripDate));
    const query = `UPDATE trips 
    SET name=$1, origin=$2, destination=$3, tripDate=$4 
    WHERE id=${tripId} AND userid=${userId} RETURNING *`;
    const values = [name, origin, destination, momentDate];

    try{
        const {rows} = await pool.query(query, values);
        successMessage.data = rows[0];
        return res.status(status.success).send(successMessage);
    }catch(error){
        errorMessage.msg = error;
        return res.status(status.error).send(errorMessage);
    }
}

/**
 * Delete Trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const deleteTrip = async (req, res) => {
    const {userId, tripId} = req.params;
    const query = `DELETE FROM trips WHERE id=${tripId} AND userid=${userId} RETURNING id, userid`;

    try{
        const {rows} = await pool.query(query);
        successMessage.data = rows[0];
        return res.status(status.success).send(successMessage);
    }catch(error){
        errorMessage.msg = error;
        return res.status(status.error).send(errorMessage);
    }
}

export {
    addNewTrip,
    getAllTrips,
    getSpecificTrip,
    updateTrip,
    deleteTrip
}