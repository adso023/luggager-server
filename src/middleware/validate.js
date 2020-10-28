import { errorMessage, status, successMessage } from '../helpers/status';

/**
 * Check Bearer Token
 * @param {Request} req
 * @param {Response} res
 * @param next
 */
const checkToken = async (req, res, next) => {
    const headers = req.headers['authorization'];

    if(typeof headers === undefined) {
        const [Bearer, jwt] = headers.split(' ');
        req.token = jwt;
        next();
    } else {
        errorMessage.msg = 'Invalid token - Unauthorized';
        res.status(status.unauthorized).send(errorMessage);
    }
}

export {
    checkToken
};
