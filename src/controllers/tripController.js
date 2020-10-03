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

    const query = `INSERT INTO trips 
    (userid, name, origin, destination, tripDate) 
    VALUES ($1,$2,$3,$4,$5) RETURNING id, userid`;
    const values = [userId, name, origin, destination, tripDate];

    try {
        const {rows, rowCount} = await pool.query(query, values);
        if(rowCount === 0) {
            errorMessage.msg = 'Nothing was created';
            return res.status(status.bad).send(errorMessage);
        }
        successMessage.data = rows[0];
        return res.status(status.created).send(successMessage);
    } catch(error) {
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
    
}

/**
 * Get Specific Trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const getSpecificTrip = async (req, res) => {
    
}

/**
 * Update Specific Trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const updateTrip = async (req, res) => {
    
}

/**
 * Delete Trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const deleteTrip = async (req, res) => {
    
}

export {
    addNewTrip,
    getAllTrips,
    getSpecificTrip,
    updateTrip,
    deleteTrip
}