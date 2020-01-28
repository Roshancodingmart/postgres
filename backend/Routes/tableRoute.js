const express = require('express');
const router = express.Router();
const create=require('../Controllers/tableController')
router.post('/',create.tableUser);

module.exports=router;