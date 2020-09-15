import express from 'express';
import { validateTrip, validateUser } from '../middleware/validate';
const router = express.Router();

router.get('/:uniqueId/:tripId/bags', validateUser, validateTrip);
router.get('/:uniqueId/:tripId/bags/:bagId', validateUser, validateTrip);
router.post('/:uniqueId/:tripId/bags/create', validateUser, validateTrip);
router.put('/:uniqueId/:tripId/bags/:bagId', validateUser, validateTrip);
router.delete('/:uniqueId/:tripId/bags/:bagId', validateUser, validateTrip);

export default router;