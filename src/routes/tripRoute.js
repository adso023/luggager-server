import express from 'express';
import { addNewTrip, getAllTrips, getSpecificTrip, updateTrip } from '../controllers/tripController';
import { deleteUser } from '../controllers/userController';
import { validateUser, validateTrip } from '../middleware/validate';
const router = express.Router();

router.get('/:userId/trips', validateUser, getAllTrips);
router.get('/:userId/trips/:tripId', validateUser, validateTrip, getSpecificTrip);
router.post('/:userId/trips/create', validateUser, addNewTrip);
router.put('/:userId/trips/:tripId/update', validateUser, validateTrip, updateTrip);
router.delete('/:userId/trips/:tripId/delete', validateUser, validateTrip, deleteUser);

export default router;