const { Schema, model, SchemaTypes, Types } = require('mongoose');

const jobApplicationSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'MasterStudents', required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'JobOffers', required:true },
    applicationDate: { type: Date },
    type: { type: String },
    qualification: { type: Number },
    tpCoachComments: { type: String },
    studentComments: { type: String },
    meetingDate: { type: String }
});

module.exports = model('JobApplications', jobApplicationSchema);