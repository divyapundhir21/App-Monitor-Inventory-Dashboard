const mongoose = require('mongoose');


const StatusSchema = new mongoose.Schema({
url: { type: String },
status: { type: String, enum: ['UP','DOWN','UNKNOWN'], default: 'UNKNOWN' },
httpCode: Number,
responseTimeMs: Number,
checkedAt: { type: Date, default: Date.now }
}, { _id: false });


const VendorSchema = new mongoose.Schema({
vendorName: String,
contactPerson: String,
email: String,
phone: String,
contractExpiry: Date
}, { _id: false });


const AppSchema = new mongoose.Schema({
appId: { type: String, required: true, unique: true, index: true },
appName: { type: String, required: true, index: true },
technicalOwner: { type: String, index: true },
secondaryOwner: String,
businessOwner: String,
informationSteward: String,
productLine: String,
prodUrl: String,
testUrl: String,
prodResourceGroup: String,
testResourceGroup: String,
techStack: [String],
domain: { type: String, enum: ['Cloud','PowerApps','Power BI','Other'], default: 'Other', index: true },
description: String,


isVendorApp: { type: Boolean, default: false },
vendorDetails: VendorSchema,


createdAt: { type: Date, default: Date.now },
updatedAt: Date,


currentStatus: { type: String, enum: ['UP','DOWN','UNKNOWN'], default: 'UNKNOWN', index: true },
lastCheckedAt: Date,
statusHistory: [StatusSchema]
});


// text index for basic search
AppSchema.index({ appId: 'text', appName: 'text', technicalOwner: 'text' });


module.exports = mongoose.model('Application', AppSchema);
