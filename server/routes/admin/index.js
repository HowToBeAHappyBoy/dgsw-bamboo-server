const controller = require('./admin.controller');
const authFunc=require('../../middlewares/auth');
let router=require('express').Router();

router.route('/allow/:id').get(controller.allow)
router.route('/allow').patch(controller.reject)
router.route('/posted').get(controller.readPost)

module.exports=router