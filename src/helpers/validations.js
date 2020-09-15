import moment from 'moment';
/**
 * Check valid email
 * @param {string} email
 * @returns {Boolean} True or False
 */
const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

/**
 * isEmpty helper method
 * @param {string} input
 * @returns {Boolean} True or False
 */
const isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }

    if (input.replace(/\s/g, '').length) {
        return false;
    }
    return true;
};

/**
 * empty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
const empty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
};

/**
 * Date is past validation
 * @param {Date} date
 * @returns {boolean} True or False
 */
const dateIsPast = (date) => {
    return moment(date).isBefore(moment.now());
}

export {
    empty,
    isEmpty,
    isValidEmail,
    dateIsPast
}