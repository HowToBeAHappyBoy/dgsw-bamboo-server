const controller = require('./user.controller');
const authFunc=require('../../middlewares/auth');
let router=require('express').Router();

router.route('/post/:desc').get(controller.sendPost)
router.route('/post').post(authFunc,controller.readPost)

module.exports=router