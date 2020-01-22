const express = require('express');
const router = express.Router();
const create=require('../Controllers/updateController')
router.post('/',create.updateUser);

module.exports=router;