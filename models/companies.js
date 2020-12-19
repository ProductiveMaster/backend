const { Schema, model } = require('mongoose');

const companyContactSchema = new Schema({
    Name: { type: String, required: true },
    contactNumber: { type: Number },
    email: { type: String, lowercase: true }
});

var contacts = model('CompanyContact', companyContactSchema);

const companyRateSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    rate: { type: Number },
    comments: { type: String }
});

var rates = model('CompanyRates', companyRateSchema);

const companiesSchema = new Schema({
    companyName: { type:String, required: [true, 'Company Name is required'], trim:true },
    cityBase: { type: String },
    webPage: { type: String, lowercase: true },
    about: { type: String, required: true },
    contacts: [ companyContactSchema ],
    rates: [ companyRateSchema ]
});

module.exports = model('Companies', companiesSchema)