  
module.exports = function (injectedStore) {
    let store = injectedStore;

    async function getApiKey(userType) {
        console.log("usertype", userType);
        const apiKey = await store.findOne({ type: userType });
        return apiKey || false;
    }

    return {
        getApiKey
    }
}