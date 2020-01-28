const express = require('express');
const router = express.Router();
const create=require('../Controllers/deleteController')
router.post('/',create.deleteUser);

module.exports=router;