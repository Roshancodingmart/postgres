const express = require('express');
const router = express.Router();
const create=require('../Controllers/viewController')
router.post('/',create.viewUser);

module.exports=router;