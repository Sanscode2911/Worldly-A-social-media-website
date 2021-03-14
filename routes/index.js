const express = require('express');
const router = express.Router();
console.log("inside routes")
const homeController=require('../controllers/homeContoller')
const trial_controller=require('../controllers/trial_controller');

router.get('/',homeController.home)
router.use('/users',require('./users'))
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
//for any futher routes,access from here
//router.use('/routername',require('./routerfile'));
module.exports=router;