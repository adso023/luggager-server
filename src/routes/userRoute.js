import express from 'express';
import { createUser, deleteUser, getUser, updateUser } from '../controllers/userController';
import { validateUser } from '../middleware/validate';

const router = express.Router();

router.post('/users/auth/register', createUser);
router.put('/users/:uniqueId/update', validateUser, updateUser);
router.get('/users/:uniqueId', validateUser, getUser);
router.delete('/users/:uniqueId', validateUser, deleteUser);

//Testing route to check if the endpoint is working
router.get('/users/helloworld', function (req, res, next) {
    res.send('hello world');
});

export default router;