const Ls = {
    set(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error('Error setting localStorage item:', error);
        }
    },

    get(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error('Error getting localStorage item:', error);
            return null;
        }
    },
}

export default Ls;