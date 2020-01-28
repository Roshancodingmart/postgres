const express = require('express');
const router = express.Router();
const create=require('../Controllers/displayController')
router.post('/',create.displayTable);

module.exports=router;