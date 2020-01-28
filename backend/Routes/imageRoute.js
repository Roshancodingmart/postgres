const express = require('express');
const router = express.Router();
const create=require('../Controllers/imageController')
router.post('/',create.insertImage);

module.exports=router;