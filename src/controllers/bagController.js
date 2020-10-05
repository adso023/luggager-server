import pool from '../database/pool';
import { errorMessage, status, successMessage } from '../helpers/status';
import {isEmpty} from "../helpers/validations";

/**
 * Add bag to database
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const addBag = async function (req, res) {
    const {description, type} = req.body;
    const {userId, tripId} = req.params;

    const query = `INSERT INTO  luggage 
    (tripId, description, type) 
    VALUES ($1, $2, $3) RETURNING id, tripId`;
    const values = [tripId, description, type];

    if(isEmpty(description) || isEmpty(type)) {
        errorMessage.msg = 'One or more fields are empty';
        return res.status(status.error).send(errorMessage);
    }

    try{
        const {rows} = await pool.query(query, values);
        successMessage.data = rows[0];
        return res.status(status.created).send(successMessage);
    }catch(error){
        errorMessage.msg = error;
        return res.status(status.error).send(errorMessage);
    }
}

/**
 * Get all bags pertaining to a trip
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const getBags = async function(req, res) {}

/**
 * Get specific bag
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const getBag = async function(req, res) {}

/**
 * update a bag information
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const updateBag = async function(req, res) {}

/**
 * delete a bag
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const deleteBag = async function(req, res) {}