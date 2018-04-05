const controller = require('./admin.controller');
const certFunc=require('../../../middlewares/cert');
let router=require('express').Router();

router.route('/allow/:id').get(certFunc,controller.allow)
router.route('/allow').patch(certFunc,controller.reject)
router.route('/posted/:id').get(certFunc,controller.readPost)
router.route('/count').get(certFunc,controller.count)

module.exports=router