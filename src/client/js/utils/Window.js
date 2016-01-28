class Window {

    /**
     * @returns {string} global location search
     */
    getQueryString() {
        return global.location.search;
    }
}

export default new Window;