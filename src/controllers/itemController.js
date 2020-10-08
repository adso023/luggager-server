import pool from '../database/pool';
import { errorMessage, status, successMessage } from '../helpers/status';
import {isEmpty} from "../helpers/validations";

/**
 * Get all items function
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const getItems = async function(req, res) {
    const {bagId} = req.params;
    const query = 'SELECT * FROM items WHERE luggageId=$1';
    const values = [bagId]

    try{
        const {rows} = pool.query(query, values);
        successMessage.data = rows;
        return res.status(status.success).send(successMessage);
    }catch(error){
        errorMessage.msg = error;
        return res.status(status.error).send(errorMessage);
    }
}

/**
 * Get all items function
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const getItem = async function(req, res) {
    const {bagId, itemId} = req.params;
    const query = 'SELECT * FROM items WHERE luggageId=$1 AND id=$2';
    const values = [bagId, itemId];

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
 * Get all items function
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const createItem = async function(req, res) {}

/**
 * Get all items function
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const updateItem = async function(req, res) {}

/**
 * Get all items function
 * @param {Request} req
 * @param {Response} res
 * @returns {object} reflection object
 */
export const deleteItem = async function(req, res) {}
