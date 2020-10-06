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
export const getBags = async function(req, res) {
    const {tripId} = req.params;
    const query = `SELECT * FROM luggage WHERE tripId=${tripId}`;

    try{
        const {rows} = await pool.query(query);
        successMessage.data = rows;
        return res.status(status.success).send(successMessage);
    }catch(error){
        errorMessage.msg = error;
        return res.status(status.error).send(errorMessage);
    }
}

/**
 * Get specific bag
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const getBag = async function(req, res) {
    const {tripId, bagId} = req.params;
    const query = `SELECT * FROM luggage WHERE id=${bagId} AND tripId=${tripId}`;
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
 * update a bag information
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const updateBag = async function(req, res) {
    const {description, type} = req.body;
    const {tripId, bagId} = req.params;

    const query = `UPDATE luggage SET description=$1, type=$2 WHERE id=${bagId} AND tripId=${tripId}`;
    const values = [description, type];

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
 * delete a bag
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const deleteBag = async function(req, res) {
    const {tripId, bagId} = req.params;
    const query = `DELETE FROM luggage WHERE id=${bagId} AND tripId=${tripId} RETURNING id, tripId`;

    try{
        const {rows} = await pool.query(query);
        successMessage.data = rows[0];
        return res.status(status.success).send(successMessage);
    }catch(error){
        errorMessage.msg = error;
        return res.status(status.error).send(errorMessage);
    }
}