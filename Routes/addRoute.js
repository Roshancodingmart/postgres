const express = require('express');
const router = express.Router();
const create=require('../Controllers/addController')
router.post('/',create.createUser);

module.exports=router;