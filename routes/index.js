const express = require('express');
const router = express.Router();
console.log("inside routes")
const homeController=require('../controllers/homeContoller')
const trial_controller=require('../controllers/trial_controller');

router.get('/',homeController.home)
router.use('/users',require('./users'))
router.get('/trial',trial_controller.trial);
module.exports=router;