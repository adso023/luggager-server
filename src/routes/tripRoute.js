import express from 'express';
import {addNewTrip, deleteTrip, getAllTrips, getSpecificTrip, updateTrip} from '../controllers/tripController';
import { checkToken } from '../middleware/validate';
const router = express.Router();

/**
 * Get all the trips
 * Middleware to be added to validate the user
 */
router.get('/trips', checkToken, getAllTrips);

/**
 * Get specific trips
 * Param: tripId
 */
router.get('/trips/:tripId', checkToken, getSpecificTrip);

/**
 * Create new trip
 * Body: {name, origin, destination, tripDate}
 */
router.post('/trips/create', checkToken, addNewTrip);

/**
 * Update specific trips
 * Body: {name, origin, destination, tripDate}
 * Param: tripId
 */
router.put('/trips/:tripId', checkToken, updateTrip);

/**
 * Delete a specific trip
 * Param: tripId
 */
router.delete('/trips/:tripId', checkToken, deleteTrip);

export default router;
