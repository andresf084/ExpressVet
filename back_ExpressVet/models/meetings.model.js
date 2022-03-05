const mongoose = require('mongoose');
const { v4: uuidv4} = require('uuid');

var meetingsMasterSchema = new mongoose.Schema
({
    IdMeeting: {type: String, default: uuidv4()},
    created_at: {type: Date, default: Date.now()},
    startDateTime: {type: Number, required: true},
    endDateTime: {type: Number, required: true},
    petName: {type: String, lowercase: true, required: true},
    petKind: {type: String, lowercase: true, required: true},
    petOwner: {type: String, lowercase: true, required: true},
    caseDescription: {type: String, lowercase: true, required: true},
    veterinaryName: {type: String, lowercase: true, required: true},
    statusName: {type: String, lowercase: true},
    statusComment: {type: String, lowercase: true},
    statusDate: {type: Date, default: Date.now()}
})

module.exports = mongoose.model ('Meetings_Master', meetingsMasterSchema)