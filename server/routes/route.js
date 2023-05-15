const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {
    register,Login,getAllUsers,getUser,updateUserInfo
} = require('../controllers/index.js');
const authorize = require('../midlleware/index.js')

router.route('/register')
    .post([
        check('email','please enter a valid email').isEmail(),
        check('password','please provide a password that is greater than 5 caracters').isLength({min:6}),
        check('username','please provide a valid username that is greater than a 6 carcaters').isLength({min:6})
    ],register);


router.route('/Login').post(Login);

router.route('/').get(getAllUsers);

router.route('/profile').post(authorize,getUser);

router.route('/updateUser/:id').put(updateUserInfo);

module.exports = router;