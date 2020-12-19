module.exports = function (injectedStore) {
    let store = injectedStore;
    const PAGE_SIZE = 1;

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

    async function getOffers(page = 1) {
        const skip = (page - 1) * PAGE_SIZE;
        const offers = await store.find().skip(skip).limit(PAGE_SIZE);
        const count = await store.countDocuments();
        const paginatedResponse = {
            totalPages: Math.ceil(count / PAGE_SIZE),
            currentPage: page ? page : 1,
            offers: offers
        };
        return paginatedResponse || [];
    }

    async function getOffer(offerQuery) {
        const offer = await store.findOne(offerQuery);
        return offer || false;
    }

    async function search(filter, type) {
        try {
            let searchedOffers;
            if (!filter && !type)
                return await getOffers();
            else if (!filter && type)
                searchedOffers = await store.find({ "category": { $regex: type, $options: 'i' } });
            else if (filter && !type)
                searchedOffers = await store.find({ "description": { $regex: filter, $options: 'i' } });
            else
                searchedOffers = await store.find().and(
                    [
                        { "description": { $regex: filter, $options: 'i' } },
                        { "category": { $regex: type, $options: 'i' } }
                    ]);

            return searchedOffers || [];
        } catch (error) {
            console.log(error);
        }
    }



    return {
        createOffer,
        updateOffer,
        deleteOffer,
        getOffers,
        getOffer,
        search
    }
}
