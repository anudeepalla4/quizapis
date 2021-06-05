const express = require("express");
const takeQuizController = require("../controllers/takeQuiz");
const isAuth = require('../middlewars/is-auth');

const router = express.Router();

router.get('/takequiz/:questionsLength', isAuth, takeQuizController.takeQuiz);

module.exports = router