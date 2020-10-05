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
 * @param {number} date
 * @returns {boolean} True or False
 */
const dateIsPast = (date) => {
    return moment(date).isBefore(moment.now());
}

/**
 *
 * @param {number} type
 */
const isValidLuggageTypes = (type) => {
    return validLuggageTypes[type] !== null;
}

const validLuggageTypes = {
    WheeledDuffel: 0,
    WheeledLuggage: 1,
    CarryOnLuggage: 2,
    WheeledBackpacks: 3,
    BagsSleeves: 4,
    DuffelBags: 5,
}

export {
    empty,
    isEmpty,
    isValidEmail,
    dateIsPast
}