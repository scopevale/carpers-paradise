import dataFetcher from './DataFetcher';
import dataParser from './DataParser';
import dataOperator from './DataOperator';

class DataProvider {

    /**
     * Parses data from the dataFetcher
     * and then returns the queried result
     * @param {object} options
     * @param {string} options.meterType
     * @param {string} options.granularity
     * @param {moment} options.startDate
     * @param {moment} options.endDate
     * @param callback
     */
    getUsage(options, callback) {

        dataFetcher.getUsage(options, (err, data) => {
            if (err) {
                return callback(err);
            }

            data = dataParser.parseData(data);
            data = dataOperator.queryData({ startDate: options.startDate, endDate: options.endDate },
                data);

            callback(null, data);
        });
    }

}

export default new DataProvider;