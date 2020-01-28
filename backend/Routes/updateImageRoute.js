const express = require('express');
const router = express.Router();
const create=require('../Controllers/updateImageController')
router.post('/',create.updateImage);

module.exports=router;