import express from 'express';
import {createItem} from "../controllers/itemController";
const router = express.Router();

/**
 * Get all items pertaining to a trip
 * Params: {userId, tripId, bagId}
 */
router.get('/items/:userId/:tripId/:bagId/items');

/**
 * Get specific item
 * Params: {userId, tripId, bagId, itemId}
 */
router.get('/items/:userId/:tripId/:bagId/items/:itemId');

/**
 * Create new item for bag
 * Param: {userId, tripId, bagId}
 * Body: {description, type}
 */
router.post('/items/:userId/:tripId/:bagId/items', createItem);

/**
 * Update item in bag
 * Param: {userId, tripId, bagId, itemId}
 * Body: {description, type}
 */
router.put('/items/:userId/:tripId/:bagId/items/:itemId');

/**
 * Delete item from bag
 * Param: {userId, tripId, bagId, itemId}
 */
router.delete('/items/:userId/:tripId/:bagId/items/:itemId');

export default router;