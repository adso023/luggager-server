import express from 'express';
import {createUser, deleteUser, getUser, login, updateUser} from '../controllers/userController';
import {checkToken} from '../middleware/validate';

const router = express.Router();

//Test if endpoint is working
router.get('/helloWorld', function (req, res, _) {
    res.send('hello world');
});

/**
 * Post request to authenticate user
 * Body: {email, username, password}
 */
router.post('/user/login', login);

/**
 * Post request to create a user
 * Body: {firstName, lastName, email, password, username, uid}
 */
router.post('/user/register', createUser);

/**
 * Put request to update a user information
 * Note: Password should have a different route
 * Headers: {Authorization: Bearer ******}
 * Body: {firstName?, lastName?, email?, username?}
 * Param: userId
 */
router.put('/user/update', checkToken, updateUser);

/**
 * Get request to get a specific user
 * Headers: {Authorization: Bearer ******}
 * Param: userId (should be non null)
 */
router.get('/user', checkToken, getUser);

/**
 * Delete request to delete a specified user
 */
router.delete('/user/delete', checkToken, deleteUser);


export default router;
