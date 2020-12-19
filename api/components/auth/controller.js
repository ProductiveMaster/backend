  
module.exports = function (injectedStore) {
    let store = injectedStore;

    async function getApiKey(userType) {
        const apiKey = await store.findOne({ type: userType });
        return apiKey || false;
    }

    return {
        getApiKey
    }
}