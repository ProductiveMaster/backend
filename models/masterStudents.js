const { Schema, model } = require('mongoose');

const masterStudentsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    skills: [ String ],
    cv_path: { type: String, trim:true },
    linkedInProfile: { type: String, trim:true },
    level: { type: String, trim:true },
    companyFeedback: {
        companyId: { type: Schema.Types.ObjectId, ref: 'Companies' },
        rate: { type: Number },
        comments: { type: String }
    },
    tpCoach: { type: Schema.Types.ObjectId, ref: 'Users', required: true }
}, { timestamps: true });

module.exports = model('masterStudents', masterStudentsSchema);