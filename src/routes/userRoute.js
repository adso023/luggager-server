import express from 'express';
import { createUser, deleteUser, getUser, updateUser } from '../controllers/userController';
import { validateUser } from '../middleware/validate';

const router = express.Router();

router.get('/helloworld', function (req, res, next) {
    res.send('hello world');
});

router.post('/users/register', createUser);
router.put('/users/:userId/update', validateUser, updateUser);
router.get('/users/:userId', validateUser, getUser);
router.delete('/users/:userId/delete', validateUser, deleteUser);

//Testing route to check if the endpoint is working


export default router;