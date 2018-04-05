const controller = require('./user.controller');
let router=require('express').Router();

router.route('/post').post(controller.sendPost)
router.route('/posted/:id').get(controller.readPost)
router.route('/count').get(controller.count)

module.exports=router