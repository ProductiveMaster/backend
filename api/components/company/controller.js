module.exports = function (injectedStore) {
    let store = injectedStore;

    async function createCompany(data) {
        const created = new store(data);
        await created.save();
        return created;
    }

    async function updateCompany(companyId, data) {
        const updated = await store.findOneAndUpdate({ _id: companyId }, data, {
            new: true,
            runValidators: true
        }); 
        return updated || false;
    }

    async function deleteCompany(companyId) {
        const deletedCompany = await store.findOneAndRemove({ _id: companyId }, { select: _id });
        return deletedCompany;
    }

    async function getCompanies() {
        const companies = await store.find();
        return companies || [];
    }

    async function getCompany(companyQuery) {
        const company = await store.findOne(companyQuery);
        return company || false;
    }

    return { 
        createCompany,
        updateCompany,
        deleteCompany,
        getCompanies,
        getCompany
    }
}
