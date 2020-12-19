const { Schema, model } = require('mongoose');

const jobHistorySchema = new Schema({
    masterStudent: { type: Schema.Types.ObjectId, ref: 'masterStudents', required: true },
    job: { type: Schema.Types.ObjectId, ref: 'JobOffers', required: true },
    hiredDate: { type: Date },
    salary: { type: Number },
    tpComments: { type: String },
    masterComments: { type: String }
});

module.exports = model('JobHistory', jobHistorySchema);