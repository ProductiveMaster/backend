module.exports = function (injectedStore) {
    let store = injectedStore;

    async function createStudent(data) {
        const created = new store(data);
        await created.save();
        return created;
    }

    async function updateStudent(studentId, data) {
        const updated = await store.findOneAndUpdate({ _id: studentId }, data, {
            new: true,
            runValidators: true
        }); 
        return updated || false;
    }

    async function deleteStudent(studentId) {
        const deletedStudent = await store.findOneAndRemove({ _id: studentId }, { select: _id });
        return deletedStudent;
    }

    async function getStudents() {
        const students = await store.find();
        return students || [];
    }

    async function getStudent(studentQuery) {
        const student = await store.findOne(studentQuery);
        return student || false;
    }

    return { 
        createStudent,
        updateStudent,
        deleteStudent,
        getStudents,
        getStudent
    }
}
