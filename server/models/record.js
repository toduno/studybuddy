const mongoose = require('mongoose')

const studyRecordSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean
    },
    //ASSIGNING RECORDS TO USERS
    user_id: {
        type: String,
        required: true
    } //every study record must be associated with a user

}, {timestamps: true}
)

module.exports = mongoose.model('StudyRecord', studyRecordSchema)