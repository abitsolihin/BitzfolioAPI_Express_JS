import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, new Date().toISOString().replace(/:/g,'-') + ext)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/webp"
        ) {
            cb(null, true)
        } else {
            console.log('File Not Supported')
            cb(null, false)
        }
        }
})

export default upload