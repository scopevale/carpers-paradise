class SessionProvider {

    /**
     * @returns {Object} session
     * @returns {string} session.customerNumber
     * @returns {string} session.accessToken
     * @returns {string} session.apiKey
     */
    getSession() {

        return {
            customerNumber: global.session.customerNumber,
            accessToken: global.session.accessToken,
            apiKey: global.session.apiKey
        };
    }

}

export default new SessionProvider;