import _ from 'lodash';
import usageCache from './UsageCache';
import usageClient from './UsageClient';
import sessionProvider from './SessionProvider';

class DataFetcher {

    /**
     * Fetches usage data from the cache, falling back to the API,
     * based on the current session
     * @param {object} options
     * @param {string} options.meterType
     * @param {string} options.granularity
     * @param {moment} options.startDate
     * @param {moment} options.endDate
     * @param {callback} callback
     */
    getUsage(options, callback) {

        let session = sessionProvider.getSession();

        options.customerNumber = session.customerNumber;

        usageCache.getData(options, handleCacheCallback);

        function handleCacheCallback(err, data) {
            if (!err) {
                return returnData(data);
            }

            options = _.merge(options, session);

            usageClient.getData(options, handleClientCallback);
        }

        function handleClientCallback(err, data) {
            if (err) {
                return callback(new Error('no data'));
            }

            usageCache.setData(options, data);

            return returnData(data);
        }

        function returnData(data) {

            data.meterType = options.meterType;

            callback(null, data);
        }

    }

}

export default new DataFetcher;