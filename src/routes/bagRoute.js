import express from 'express';
import { validateTrip, validateUser } from '../middleware/validate';
import {addBag, deleteBag, getBag, getBags, updateBag} from "../controllers/bagController";
const router = express.Router();

/**
 * Create a new luggage item
 * Body: {description, type}
 * Params: {userId, tripId}
 */
router.post('/luggage/:userId/:tripId/create', addBag);

/**
 * Get all bags pertaining to a user and their trip
 * Params: {userId, tripId}
 */
router.get('/luggage/:userId/:tripId/bags', getBags);

/**
 * Get specific bag
 * Params: {userId, tripId, bagId}
 */
router.get('/luggage/:userId/:tripId/bags/:bagId', getBag);

/**
 * Update contents of luggage item
 * Body: {description, type}
 * Params: {userId, tripId, bagId}
 */
router.put('/luggage/:userId/:tripId/bags/:bagId', updateBag);

/**
 * Delete luggage item
 * Params: {userId, tripId, bagId}
 */
router.delete('/luggage/:userId/:tripId/bags/:bagId', deleteBag);

export default router;