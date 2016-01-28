import restClient from './RestClient';
import settings from './Settings';

class UsageClient {

    /**
     * @param {object} options
     * @param {string} options.customerNumber
     * @param {string} options.meterType
     * @param {string} options.accessToken
     * @param {string} options.apiKey
     * @param {string} options.granularity
     * @param {moment} options.startDate
     * @param {moment} options.endDate
     * @param {UsageClient~usageCallback} callback
     */
    getData(options, callback) {

        let baseUri = settings.getSetting('API_BASE_URI');
        let usageEndpoint = settings.getUsageEndpoint(options.customerNumber, options.meterType);

        let url = `${baseUri}${usageEndpoint}`;

        let headers = {
            Authorization: `Bearer ${options.accessToken}`,
            api_key: options.apiKey
        };

        let query = {
            granularity: options.granularity,
            startdate: options.startDate.format('YYYY-MM-DD'),
            enddate: options.endDate.format('YYYY-MM-DD')
        };

        restClient.get({ url: url, headers: headers, query: query }, (err, response) => {

            if (err && err.status) {
                return callback(new Error(err.status));
            }

            if (err) {
                return callback(new Error('failed to get a response from the server'));
            }

            return callback(null, response.body);
        });
    }

    /**
     * @callback UsageClient~usageCallback
     * @param {Error} err
     * @param {Object} data
     */
}

export default new UsageClient;