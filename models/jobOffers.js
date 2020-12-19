const { Schema, model, SchemaTypes } = require('mongoose');

const offerApplicationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users'},
    applicationDate: { type: Date }
});

var offerApplications = model('OfferApplications', offerApplicationSchema);

const jobOffersSchema = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: 'Companies' },
    companyName: { type: String },
    tittleOffer: { type: String, required: true },
    description: { type:String, required: [true, 'Job Offer must have a description'] },
    salaryFrom: { type:Number },
    salaryTo: { type: Number },
    city: { type: String },
    country: { type: String },
    category: { type: String },
    offerLevel: { type: String },
    offerRequirements: [ String ],
    dueDate: { type: Date },
    responsabilities: [ String ],
    isRemote: { type:Boolean, default: false },
    isActive: { type: Boolean, default: true },
    applications: [ offerApplicationSchema ],
}, { timestamps: true });

module.exports = model('JobOffers', jobOffersSchema);