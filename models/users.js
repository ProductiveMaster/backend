const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: { type: String, required: [true, 'User name is required'], trim: true },
    lastname: { type: String, required: false, trim:true },
    country: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    gender: { type:String, required: false, lowercase: true, trim: true },
    birthDate: { type: Date }, 
    password: { type: String, required: true }, 
    imgPath: { type: String },
    type: { type: String, lowercase: true }
}, { timestmaps:true });

userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

module.exports = model('Users', userSchema);