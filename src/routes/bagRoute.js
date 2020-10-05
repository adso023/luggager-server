import express from 'express';
import { validateTrip, validateUser } from '../middleware/validate';
import {addBag} from "../controllers/bagController";
const router = express.Router();

/**
 * Create a new luggage item
 * Body: {description, type}
 * Params: {userId, tripId}
 */
router.get('/luggage/:userId/:tripId/create', addBag);
router.get('/:uniqueId/:tripId/bags/:bagId');
router.post('/:uniqueId/:tripId/bags/create');
router.put('/:uniqueId/:tripId/bags/:bagId');
router.delete('/:uniqueId/:tripId/bags/:bagId');

export default router;