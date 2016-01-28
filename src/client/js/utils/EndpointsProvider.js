import _ from 'lodash';

export const ELECTRICITY = 'electricity';
export const GAS = 'gas';

class EndpointsProvider {


    /***
     * @returns array
     */
    getEndpoints() {

        if (!global.endpoints || !global.endpoints.endpoints) {
            return [];
        }

        return _(global.endpoints.endpoints).filter((endpoint) => {
            return endpoint.active;
        }).map((endpoint) => {

            if (endpoint.type === 'MPAN') {
                return ELECTRICITY;
            }

            if (endpoint.type === 'MPRN') {
                return GAS;
            }

        }).value();

    }

}

export default new EndpointsProvider;