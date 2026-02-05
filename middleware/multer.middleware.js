const multer = require('multer');
const path = require('path');

// storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        if (file.fieldname === "category_image") {
            cb(null, 'public/uploads/categories');
        }
        else if (file.fieldname === "admin_image") {
            cb(null, 'public/uploads/admins');
        }
        else if (file.fieldname === "user_image") {
            cb (null, 'public/uploads/users');
        }
        else {
            cb(null, 'public/uploads');
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

module.exports = upload;