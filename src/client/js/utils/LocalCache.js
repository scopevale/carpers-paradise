class LocalCache {

    get(key) {

        if (this.storageEnabled()) {
            return JSON.parse(global.localStorage.getItem(key));
        }

        return null;
    }

    set(key, value) {

        if (this.storageEnabled()) {
            global.localStorage.setItem(key, JSON.stringify(value));
        }
    }

    storageEnabled() {
        try {
            let storage = global.localStorage;
            let x = '__storage_test__';

            storage.setItem(x, x);
            storage.removeItem(x);

            return true;
        } catch (e) {

            return false;
        }
    }

}

export default new LocalCache;