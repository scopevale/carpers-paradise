import clock from './Clock';
import _ from 'lodash';
import async from 'async';
import moment from 'moment';

import settings from './Settings';
import endpointsProvider from './EndpointsProvider';
import dataProvider from './DataProvider';
import dataFormatter from './DataFormatter';

class DataService {

    /**
     * @param {Object} options
     * @param {string} [options.granularity]
     * @param {moment} [options.startDate]
     * @param {moment} [options.endDate]
     * @param {callback} callback
     */
    getUsageData(options, callback) {

        let defaultOptions = {
            granularity: settings.getSetting('granularity'),
            startDate: moment(settings.getSetting('startDate'), 'YYYY-MM-DD'),
            endDate: clock.getNow()
        };

        options = _.merge(defaultOptions, options);

        let endpoints = endpointsProvider.getEndpoints();

        let tasks = _.map(endpoints, function (meterType) {
            return function (cb) {

                let providerOptions = _.clone(options);
                providerOptions.meterType = meterType;

                dataProvider.getUsage(providerOptions, cb);
            };
        });

        async.parallel(tasks, (err, results) => {
            if (err) {
                return callback(err);
            }

            let data = dataFormatter.formatData({ granularity: options.granularity }, results);

            callback(null, data);
        });
    }

    /**
     * @callback callback
     * @param {Error} err
     * @param {Object} data
     */
}

export default new DataService;