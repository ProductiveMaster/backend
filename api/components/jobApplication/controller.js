module.exports = function (injectedStore) {
    let store = injectedStore;

    async function createApplication(data) {
        const created = new store(data);
        await created.save();
        return created;
    }

    async function updateApplication(applicationId, data) {
        const updated = await store.findOneAndUpdate({ _id: applicationId }, data, {
            new: true,
            runValidators: true
        }); 
        return updated || false;
    }

    async function deleteApplication(applicationId) {
        const deletedApplication = await store.findOneAndRemove({ _id: applicationId }, { select: _id });
        return deletedApplication;
    }

    async function getApplications() {
        const applications = await store.find();
        return applications || [];
    }

    async function getApplication(applicationQuery) {
        const application = await store.findOne(applicationQuery);
        return application || false;
    }

    return { 
        createApplication,
        updateApplication,
        deleteApplication,
        getApplications,
        getApplication
    }
}
