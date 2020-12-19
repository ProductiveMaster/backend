  
module.exports = function (injectedStore) {
    let store = injectedStore;

    async function getApiKey(token) {
        const apiKey = await store.findOne({ token: token });
        return apiKey || false;
    }

    return {
        getApiKey
    }
}