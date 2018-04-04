const router = require('express').Router();
const user=require('./api/user');
const admin=require('./api/admin');
const cert=require('./api/cert');

router.use('/user',user);
router.use('/admin',admin);
router.use('/cert',cert);

module.exports=router;