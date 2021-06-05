const Quizstore = require('../models/quizstore');

exports.quiz = (req, res, next) => {
    const question = req.body.question;
    const answers = req.body.answers;
    const correctAnswer = req.body.correctAnswer;

    const quizstore = new Quizstore({
        question: question,
        answers: answers,
        correctAnswer: correctAnswer
    })

    quizstore.save().then(result => {
        res.status(201).json({
            message: "Post successfuly",
            data: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })

}

exports.questions = (req, res, next) => {
    Quizstore.find().then(results => {
        let questions = []
        results.length > 0 && results.map((result) => {
            questions.push({id : result._id, question : result.question})
        })
       
        res.status(201).json({ message: 'Get successfully', data: questions })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.singleQuestion = (req,res,next) => {
    const questionId = req.params.questionId;
   
    Quizstore.findById(questionId).then(result => {
        res.status(201).json({ message: 'Get successfully', data: result })
    }).catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.updateQuestion = (req,res,next) => {
    const questionId = req.params.questionId;

    Quizstore.findById(questionId).then(question => {
        if (!question) {
            const error = new Error('Could not found');
            error.statusCode = 404;
            throw error;
        }

        question.question = req.body.question;
        question.answers = req.body.answers;
        question.correctAnswer = req.body.correctAnswer
        return question.save();
    }).then(result => {
        res.status(200).json({message : "Post Updated", question : result})
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.deleteQuestion = (req,res,next) => {
    const deleteQuestionId = req.params.deleteQuestionId;
   console.log(deleteQuestionId)
    Quizstore.findById(deleteQuestionId).then(question => {
        if (!question) {
            const error = new Error('Could not found');
            error.statusCode = 404;
            throw error;
        }
        return Quizstore.findByIdAndRemove(question).then(deleteObj => {
            res.status(200).json({message : "Question Deleted", question : deleteObj})
        });
    }).catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}