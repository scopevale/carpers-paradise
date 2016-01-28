/***
 * @param {moment} date
 * @returns {string} formatted date
 */
function monthlyLabelFormatter(date) {
    return date.format('MMM-YY').toUpperCase();
}

export default monthlyLabelFormatter;
