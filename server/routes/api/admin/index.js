const controller = require('./admin.controller');
const certFunc=require('../../../middlewares/cert');
let router=require('express').Router();

router.route('/allow').post(certFunc,controller.allow)
router.route('/reject').post(certFunc,controller.reject)
router.route('/posted/:id').get(certFunc,controller.readPost)
router.route('/count').get(certFunc,controller.count)

module.exports=router