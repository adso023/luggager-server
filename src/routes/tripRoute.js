import express from 'express';
import { addNewTrip, getAllTrips, getSpecificTrip, updateTrip } from '../controllers/tripController';
import { deleteUser } from '../controllers/userController';
import { validateUser, validateTrip } from '../middleware/validate';
const router = express.Router();

/**
 * Get all the trips
 * Query: userId (cannot be null and should be a valid user id in the database)
 * Middleware to be added to validate the user
 */
router.get('/trips', getAllTrips);

/**
 * Get specific trips
 * Query: userId (cannot be null and valid in the database)
 * Param: tripId (cannot be null and valid in the database)
 */
router.get('/trips/:tripId', getSpecificTrip);

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
router.put('/trips/:userId/update/:tripId', updateTrip);

/**
 * Delete a specific trip
 * Param: userId and tripId
 */
router.delete('/trips/:userId/delete/:tripId', deleteUser);

export default router;