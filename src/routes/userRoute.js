import express from 'express';
import { createUser, deleteUser, getUser, updateUser } from '../controllers/userController';
import { validateUser } from '../middleware/validate';

const router = express.Router();

//Test if endpoint is working
router.get('/helloWorld', function (req, res, _) {
    res.send('hello world');
});

/**
 * Post request to create a user
 * Body: {firstName, lastName, email, password, username, uid}
 */
router.post('/user/register', createUser);

/**
 * Put request to update a user information
 * Note: Password should have a different route
 * Body: {firstName?, lastName?, email?, username?}
 * Param: userId
 */
router.put('/user/:userId/update', updateUser);

/**
 * Get request to get a specific user
 * Query ? userId (should be non null)
 */
router.get('/user/:userId', getUser);

/**
 * Delete request to delete a specified user
 */
router.delete('/user/:userId/delete', deleteUser);


export default router;
