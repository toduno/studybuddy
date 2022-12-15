const studyRecordModel = require('../models/record')


const getRecords = async(req, res) => {
    try{
        //ASSIGNING RECORDS TO USERS
        const user_id = req.user._id  //getting the user id from the user property that was attached to
        //the request object in the requireAuth middleware function for protected routes passed to these 
        //record routes
         
        const records = await studyRecordModel.find({ user_id }).sort({ createdAt: -1 })
        res.status(200).json(records)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}


const getRecordById = async(req, res) => {
    try{
        const record = await studyRecordModel.findById(req.params.id)
        res.status(200).json(record)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

const createRecord =  async(req, res) => {
    const { type, subject, topic, duration, notes } = req.body
    
    try{
        //ASSIGNING RECORDS TO USERS
        const user_id = req.user._id 
       
        const newRecord = studyRecordModel.create({
            type,
            subject,
            topic,
            duration,
            notes,
            user_id
        })
        
        res.status(201).json(newRecord)

    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

const updateRecord = async(req, res) => {
    console.log(req.body)
    try{
        const body = {
            ...req.body
        }

        const updateRecord = await studyRecordModel.findByIdAndUpdate({_id: req.params.id}, body, {new: true})
        
        res.status(201).json(updateRecord)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

const deleteRecord = async(req, res) => {
    try{
        const deleteRecord = await studyRecordModel.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteRecord)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}


module.exports = {
    getRecords,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord
}
