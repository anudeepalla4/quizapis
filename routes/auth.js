const express = require('express');
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');

const User = require('../models/user');
const router = express.Router();

router.post('/signup', [
    body('email').isEmail().withMessage('"Please enter validate email')
    .custom((value, {req}) => {
        return User.findOne({email: value}).then(userDoc => {
            if(userDoc) {
                return Promise.reject('Email alredy exists')
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min : 5}),
    body('name').trim().not().isEmpty()
], authController.signup);

router.post('/login', [
    body('email').isEmail().withMessage("Please Enter valid email")
], authController.login)

module.exports = router