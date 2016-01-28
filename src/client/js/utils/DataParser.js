import moment from 'moment';
import _ from 'lodash';

class DataParser {

    /**
     * Convert string time slots into moments
     * Promote the values from the array
     * @param data
     * @returns data
     */
    parseData(data) {

        let result = _.clone(data.meters[0]);

        result.usages = _.map(result.usages, (usage) => {
            return {
                timeSlot: moment(usage.timeSlot, 'YYYY-MM-DD'),
                value: usage.value[0]
            };
        });

        result.meterType = data.meterType;

        return result;
    }

}

export default new DataParser;