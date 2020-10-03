import express from 'express';
import { addNewTrip, getAllTrips, getSpecificTrip, updateTrip } from '../controllers/tripController';
import { deleteUser } from '../controllers/userController';
import { validateUser, validateTrip } from '../middleware/validate';
const router = express.Router();

router.get('/trips', validateUser, getAllTrips);
router.get('/trips', validateUser, validateTrip, getSpecificTrip);
router.post('/trips/create', validateUser, addNewTrip);
router.put('/trips/update', validateUser, validateTrip, updateTrip);
router.delete('/trips/delete', validateUser, validateTrip, deleteUser);

export default router;