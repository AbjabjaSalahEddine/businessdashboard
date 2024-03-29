const multer = require('multer');
const express = require("express");
const router = express.Router();
const functions = require("../methodes/functions");


const {excelToJson}=functions




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './data')
  },
  filename: (req, file, cb) => {
    const filename='source.xlsx';
    cb(null, filename)
}
});

const upload = multer({storage:storage});


router.post('/upload',upload.single('file') , (req, res) => {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    } else{
        excelToJson()
        return res.status(200).json({ msg: 'Data uploaded successfully' });
      }
    });

module.exports = router