export const DEFAULTS = {
    API_BASE_URI: 'http://localhost:3000/axway',
    granularity: 'monthly',
    startDate: '2010-01-01',
    cacheExpirySeconds: 300//5 minutes
};

export class Settings {

    /**
     * @param {string} setting
     * @returns {*}
     */
    getSetting(setting) {
        return DEFAULTS[setting];
    }

    /**
     * @param {string} customerNumber
     * @param {string} meterType
     * @returns {string} usageEndpoint
     */
    getUsageEndpoint(customerNumber, meterType) {
        return `/v1/customers/${customerNumber}/usage/${meterType}`;
    }
}

export default new Settings;