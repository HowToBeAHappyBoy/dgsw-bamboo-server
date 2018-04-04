const controller = require('./user.controller');
const authFunc=require('../../middlewares/auth');
let router=require('express').Router();

router.route('/post').post(controller.sendPost)
router.route('/posted/:id').get(controller.readPost)

module.exports=router