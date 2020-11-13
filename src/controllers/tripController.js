import moment from 'moment';
import pool from '../database/pool';
import { errorMessage, status, successMessage } from '../helpers/status';
import { isEmpty, dateIsPast } from '../helpers/validations';
import {verify} from 'jsonwebtoken';
import environ from '../../env';
import {findAllTrips, insertTrip} from "../database/dbQuery";


/**
 * Add a new Trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const addNewTrip = async (req, res) => {
    const token = req.token;
    verify(token, environ.secret, async (err, data) => {
        if(err) {
            errorMessage.msg = err;
            return res.status(status.unauthorized).send(errorMessage);
        } else {
            const id = data.id;
            const {name, origin, destination, tripDate} = req.body;
            // 0
            if(isEmpty(name) || origin === {} || destination === {} || isEmpty(tripDate)) {
                errorMessage.msg = 'Single/Multiple fields are empty';
                return res.status(status.bad).send(errorMessage);
            }

            if(isNaN(Date.parse(tripDate)) || dateIsPast(Date.parse(tripDate))) {
                errorMessage.msg = 'Invalid Date';
                return res.status(status.bad).send(errorMessage);
            }

            const momentDate = moment(Date.parse(tripDate)).utc();

            const {rows, rowCount, error} = await insertTrip([id, name, origin, destination, momentDate]);
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
 * Get trips
 * @param {Request} req,
 * @param {Response} res
 * @returns {object} reflection object
 */
const getAllTrips = async (req, res) => {
    const token = req.token;
    verify(token, environ.secret, async (err, data) => {
        if(err) {
            errorMessage.msg = err;
            return res.status(status.unauthorized).send(errorMessage);
        } else {
            const {id} = data;
            const {rows, rowCount, error} = await findAllTrips([id], 'userId');
            if(error) {
                console.log(`Error ${error}`);
                errorMessage.msg = error;
                return res.status(status.notfound).send(errorMessage);
            } else {
                console.log(`getAllTrips ${rows}`);
                successMessage.data = rows;
                return res.status(status.success).send(successMessage);
            }
        }
    });
}

/**
 * Get Specific Trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
const getSpecificTrip = async (req, res) => {
    const token = req.token;

    verify(token, environ.secret, async (err, data) => {
        
    });
    // const {userId, tripId} = req.params;
    // const query = `SELECT * FROM trips WHERE id=${tripId} AND userid=${userId}`;
    //
    // try{
    //     const {rows} = await pool.query(query);
    //     successMessage.data = rows[0];
    //     return res.status(status.success).send(successMessage);
    // }catch(error){
    //     errorMessage.msg = error;
    //     return res.status(status.error).send(errorMessage);
    // }
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

    if(isEmpty(name) || isEmpty(origin) || isEmpty(destination) || isEmpty(tripDate)) {
        errorMessage.msg = 'One or more fields are empty';
        return res.status(status.error).send(errorMessage);
    }

    if (isNaN(Date.parse(tripDate)) || dateIsPast(Date.parse(tripDate))) {
        errorMessage.msg = 'Invalid Date - either not a date or date given is in the past';
        return res.status(status.bad).send(errorMessage);
    }

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
