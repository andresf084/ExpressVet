const mongoose = require('mongoose');

var petMasterSchema = new mongoose.Schema
({
    petName: {type: String, lowercase: true},
    petKind: {type: String, lowercase: true},
    petBreed: {type: String, lowercase: true},
    petAge: {type: Number},
    petOwnerName: {type: String, lowercase: true},
    petOwnerPhone: {type: Number},
    petOwnerAddress: {type: String, lowercase: true},
    petOwnerTypeId: {type: String, lowercase: true},
    petOwnerId: {type: String},
    status: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now()}
})

module.exports = mongoose.model ('Pets_Master', petMasterSchema)