const express = require("express")
const {body} = require("express-validator/check");
const isAuth = require('../middlewars/is-auth');

const quizController = require("../controllers/makeQuiz");

const router = express.Router();

router.post('/quiz',  quizController.quiz);

router.get('/allQuestions',  quizController.questions);

router.get('/singleQuestion/:questionId',  quizController.singleQuestion);

router.put('/singleQuestion/:questionId', quizController.updateQuestion);

router.delete('/singleQuestion/:deleteQuestionId',  quizController.deleteQuestion)

module.exports = router