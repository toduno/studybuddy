const { v4: uuidv4 } = require('uuid') //to generate unique name for the images uploaded
const path = require('path')
const multer = require('multer')


//defining the local storage location so the files received from the client will be saved in the defined location 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({
    storage: storage, 
    fileFilter: function (req, file, callback) {
        const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
        if(allowedFileTypes.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(null, false)
            return callback(new Error('Only .png, .jpg and .jpeg format allowed!'))
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})


module.exports = upload
