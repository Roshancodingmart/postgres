const express = require('express');
const router = express.Router();
const create=require('../Controllers/createController')
router.post('/',create.createTable);

module.exports=router;