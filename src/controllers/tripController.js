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