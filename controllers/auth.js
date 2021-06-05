const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validition Failed ');
        error.statusCode = 422;
        error.data = errors.array()
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    bcrypt.hash(password, 12).then(hasPass => {
        const user = new User({
            email: email,
            password: hasPass,
            name: name
        });
        return user.save()

    }).then(result => {
        res.status(200).json({ message: 'user Created', userId: result._id })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    User.findOne().then(user => {
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 422
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password)
    }).then(isEqual => {
        if (!isEqual) {
            const error = new Error('Pssword Wrong');
            error.statusCode = 422
            throw error;
        }
        const token = jwt.sign({email : loadedUser.email, userId : loadedUser._id.toString()}, 'someSuperscretkey', {expiresIn : '1h'});
        res.status(200).json({token : token, userId : loadedUser._id.toString()})

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}