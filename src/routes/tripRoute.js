import express from 'express';
import { addNewTrip, getAllTrips, getSpecificTrip, updateTrip } from '../controllers/tripController';
import { deleteUser } from '../controllers/userController';
import { validateUser, validateTrip } from '../middleware/validate';
const router = express.Router();

router.get('/:uniqueId/trips', validateUser, getAllTrips);
router.get('/:uniqueId/trips/:tripId', validateUser, validateTrip, getSpecificTrip);
router.post('/:uniqueId/trips/create', validateUser, addNewTrip);
router.put('/:uniqueId/trips/:tripId', validateUser, validateTrip, updateTrip);
router.delete('/:uniqueId/trips/:tripId', validateUser, validateTrip, deleteUser);

export default router;