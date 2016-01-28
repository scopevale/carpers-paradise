import moment from 'moment';

class Clock {

    /**
     * @returns {moment} moment()
     */
    getNow() {
        return moment();
    }
}

export default new Clock;