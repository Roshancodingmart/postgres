const express = require('express');
const router = express.Router();
const create=require('../Controllers/signinController')
router.post('/',create.signinUser);

module.exports=router;