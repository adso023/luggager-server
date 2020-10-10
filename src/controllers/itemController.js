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
export const createItem = async function(req, res) {
    const {bagId} = req.body;
    const {description, type} = req.params;
    const query = 'INSERT INTO items (luggageId, description, type)' +
        'VALUES ($1, $2, $3) RETURNING id, luggageId';
    const values = [bagId, description, type];

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
export const updateItem = async function(req, res) {
    const {description, type} = req.params;
    const {bagId, itemId} = req.body;

    const query = 'UPDATE items SET description=$1, type=$2 WHERE luggageId=$3 AND id=$4';
    const values = [description, type, bagId, itemId];

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
export const deleteItem = async function(req, res) {}
