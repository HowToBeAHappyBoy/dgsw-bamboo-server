const controller = require('./admin.controller');
const authFunc=require('../../middlewares/auth');
let router=require('express').Router();

router.route('/allow/:id').get(authFunc,controller.allow)
router.route('/allow').patch(authFunc,controller.reject)
router.route('/posted/:id').get(authFunc,controller.readPost)

module.exports=router