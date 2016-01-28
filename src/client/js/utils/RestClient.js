import superagent from 'superagent';

class RestClient {

    /**
     * @param options
     * @param options.url
     * @param options.headers
     * @param options.query
     * @param {RestClient~responseCallback} callback
     */
    get(options, callback) {

        let request = superagent.get(options.url);

        if (options.headers) {
            request.set(options.headers);
        }

        if (options.query) {
            request.query(options.query);
        }

        request.end(callback);
    }

    /**
     * @callback RestClient~responseCallback
     * @param {Error} err
     * @param err.status
     * @param err.response
     * @param response
     * @param response.status
     * @param response.body
     */
}

export default new RestClient;