import settings from './Settings';
import clock from './Clock';
import moment from 'moment';
import localCache from './LocalCache';

function createCompositeKey(customerNumber, meterType, granularity) {
    return `${customerNumber}|${meterType}|${granularity}`;
}

class UsageCache {

    /**
     * @param {object} options
     * @param {string} options.meterType
     * @param {string} options.granularity
     * @param {moment} options.startDate
     * @param {moment} options.endDate
     * @param callback
     */
    getData(options, callback) {

        let usage = localCache.get(createCompositeKey(options.customerNumber, options.meterType, options.granularity));

        if (!usage) {
            return callback(new Error('no data in cache'));
        }

        if (clock.getNow().isAfter(moment(usage.expires))) {
            return callback(new Error('cache expired'));
        }

        callback(null, usage.data);
    }

    /**
     * @param {object} options
     * @param {string} options.meterType
     * @param {string} options.granularity
     * @param {moment} options.startDate
     * @param {moment} options.endDate
     * @param data
     */
    setData(options, data) {

        let cacheData = {
            expires: clock.getNow().add(settings.getSetting('cacheExpirySeconds'), 'seconds').toISOString(),
            startDate: options.startDate.toISOString(),
            endDate: options.endDate.toISOString(),
            data: data
        };

        localCache.set(createCompositeKey(options.customerNumber, options.meterType, options.granularity), cacheData);

    }
}

export default new UsageCache;