const controller = require('./admin.controller');
const authFunc=require('../../middlewares/auth');
let router=require('express').Router();

router.route('/allow:id').get(controller.allow)
router.route('/post').get(authFunc,controller.readPost)
router.route('/hello/:id').get(controller.hello)

module.exports=router