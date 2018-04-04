const controller=require('./cert.controller');
let router=require('express').Router();

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

module.exports=router;