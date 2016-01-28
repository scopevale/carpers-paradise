import _ from 'lodash';
import labelFormatter from './LabelFormatter';

class DataFormatter {

    /**
     * Format API data into UsageGraph data
     * @param {Object} options
     * @param {string} options.granularity
     * @param {Object[]} data
     * @param {string} data[].meterType
     * @param {string} data[].units
     * @param {number} data[].minUsage
     * @param {number} data[].maxUsage
     * @param {Object[]} data[].usages
     * @param {moment} data[].usages[].timeSlot
     * @param {number} data[].usages[].value
     * @returns {Object} data
     * @returns {string} data.units
     * @returns {number} data.min
     * @returns {number} data.max
     * @returns {number[]} data.x
     * @returns {number[]} data.y
     */
    formatData(options, data) {

        let result = {
            units: data[0].units,
            min: _.min(data, 'minUsage').minUsage,
            max: _.max(data, 'maxUsage').maxUsage,
            yTypes: _.pluck(data, 'meterType'),
            x: [],
            y: []
        };

        _.forEach(data, (dataset, dataIndex) => {

            _.forEach(dataset.usages, (usage) => {

                let xIndex = findTimeSlotIndex(result, usage);

                //if the time slot already exists, add the value and return
                if (xIndex > -1) {
                    return result.y[xIndex][dataIndex] = usage.value;
                }

                let values = generateEmptyValues(data, dataIndex, usage);

                if (usage.timeSlot.isBefore(result.x[0])) {
                    result.x.unshift(usage.timeSlot);
                    result.y.unshift(values);
                } else {
                    result.x.push(usage.timeSlot);
                    result.y.push(values);
                }

            });

        });

        result = applyCombinedDataSet(result);

        result.x = _.map(result.x, (val) => {
            return labelFormatter.format(options.granularity, val);
        });

        return result;

    }
}

function applyCombinedDataSet (result) {

    if (result.yTypes.length > 1) {
        result.combined = _.map(result.y, (data) => {
            let result = 0;

            let i = 0;
            while (i < data.length) {
                result += data[i];
                i++;
            }

            return result;
        });

        result.max = _.max(result.combined);
    }

    return result;
}

function findTimeSlotIndex (result, usage) {

    return _.findIndex(result.x, (timeSlot) => {
        return usage.timeSlot.isSame(timeSlot);
    });
}

function generateEmptyValues (data, index, usage) {
    let values = [];
    let i = 0;

    while (i < data.length) {
        //Add the current usage value at the correct index
        //otherwise fill with 0s
        values.push(i === index ? usage.value : 0 );
        i++;
    }

    return values;
}

export default new DataFormatter;