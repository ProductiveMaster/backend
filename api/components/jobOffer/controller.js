module.exports = function (injectedStore) {
    let store = injectedStore;

    async function createOffer(data) {
        const created = new store(data);
        await created.save();
        return created;
    }

    async function updateOffer(offerId, data) {
        const updated = await store.findOneAndUpdate({ _id: offerId }, data, {
            new: true,
            runValidators: true
        }); 
        return updated || false;
    }

    async function deleteOffer(offerId) {
        const deletedOffer = await store.findOneAndRemove({ _id: offerId }, { select: _id });
        return deletedOffer;
    }

    async function getOffers() {
        const offers = await store.find();
        return offers || [];
    }

    async function getOffer(offerQuery) {
        const offer = await store.findOne(offerQuery);
        return offer || false;
    }

    return { 
        createOffer,
        updateOffer,
        deleteOffer,
        getOffers,
        getOffer
    }
}
