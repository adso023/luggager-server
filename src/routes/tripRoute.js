import express from 'express';
import {addNewTrip, deleteTrip, getAllTrips, getSpecificTrip, updateTrip} from '../controllers/tripController';
import { validateUser, validateTrip } from '../middleware/validate';
const router = express.Router();

/**
 * Get all the trips
 * Query: userId (cannot be null and should be a valid user id in the database)
 * Middleware to be added to validate the user
 */
router.get('/trips/:userId', getAllTrips);

/**
 * Get specific trips
 * Param: tripId and userId (cannot be null and valid in the database)
 */
router.get('/trips/:userId/trip/:tripId', getSpecificTrip);

/**
 * Create new trip
 * Body: {name, origin, destination, tripDate}
 * Param: userId (cannot be null and must be valid in database)
 */
router.post('/trips/:userId/create', addNewTrip);

/**
 * Update specific trips
 * Body: {name, origin, destination, tripDate}
 * Param: userId and tripId
 */
router.put('/trips/:userId/trip/:tripId', updateTrip);

/**
 * Delete a specific trip
 * Param: userId and tripId
 */
router.delete('/trips/:userId/trip/:tripId', deleteTrip);

export default router;