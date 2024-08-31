

const multer = require('multer');
// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     // Accept only PDF files
//     if (file.mimetype === 'application/pdf') {
//       cb(null, true);
//     } else {
//       cb(new Error('Only PDF files are allowed'), false);
//     }
//   }
// });



const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
module.exports = upload;