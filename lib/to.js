/**
 * Function to help catch await errors
 * // https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
 *
 * @param {Promise} promise - any promise
 * @returns {Array} [err, data]
 */
module.exports = (promise) => promise.then((data) => [null, data]).catch((err) => [err]);
