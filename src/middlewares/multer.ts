import path from "path";
import multer from "multer"
import crypto from "crypto"
    
const uploadDir = path.resolve( 'files/purchaseOrder');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `purchaseOrder_${crypto.randomBytes(4).toString('hex')}.pdf`);
  }
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype !== 'application/pdf') {
    return cb(new Error('Seul les fichiers PDF sont admis !'));
  }
  cb(null, true);
};

export default multer({ storage: storage, fileFilter: fileFilter });
