const { Schema, model, SchemaTypes, Types } = require('mongoose');

const jobApplicationSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'JobOffers', required:true },
    tpCoach: { type: Schema.Types.ObjectId, ref: 'Users' },
    applicationDate: { type: Date },
    type: { type: String },
    qualification: { type: Number },
    tpCoachComments: { type: String },
    studentComments: { type: String },
    meetingDate: { type: String },
    hiredDate: { type: Date },
    salary: { type: Number }
});

module.exports = model('JobApplications', jobApplicationSchema);