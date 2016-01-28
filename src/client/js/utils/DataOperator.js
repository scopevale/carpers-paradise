import _ from 'lodash';

class DataOperator {

    /**
     * Drop the data that is outside the bounds of the query
     * @param options
     * @param {moment} options.startDate
     * @param {moment} options.endDate
     * @param {Object} data
     * @param {Object[]} data.usages
     * @param {moment} data.usages[].timeSlot
     * @param {number} data.usages[].value
     * @param {
     * @returns {object} data
     */
    queryData(options, data) {

        if (options.startDate) {
            data.usages = _.dropWhile(data.usages, (usage) => {
                return usage.timeSlot.isBefore(options.startDate);
            });
        }

        if (options.endDate) {
            data.usages = _.dropRightWhile(data.usages, (usage) => {
                return usage.timeSlot.isAfter(options.endDate);
            });
        }

        return data;

    }

}

export default new DataOperator;