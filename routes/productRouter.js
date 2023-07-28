const express = require('express');
const router = express.Router();
const API = require('../controllers/productController');
const multer = require('multer')

// multer middleware
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
  }
});

let upload = multer({
  storage: storage
}).single('images');

router.get('/', API.fetchAllProducts);
router.get('/:id', API.fetchProductByID);
router.post('/', upload, API.createProduct);
router.patch('/:id', upload, API.updateProduct);
router.delete('/:id', API.deleteProduct);

module.exports = router;