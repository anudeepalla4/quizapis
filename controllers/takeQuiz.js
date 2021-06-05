const Quizstore = require('../models/quizstore');

exports.takeQuiz = (req, res, next) => {
   
    const questionsLength = req.params.questionsLength;

    Quizstore.find().then(results => {
        if (questionsLength > 0 && results.length >= questionsLength) {
            let arr = [], questions = [];
            while (arr.length < questionsLength) {
                var n = Math.floor(Math.random() * results.length);
                if (arr.indexOf(n) === -1) {
                    arr.push(n)
                }
            }

            for(let i = 0; i<arr.length; i++) {
                questions.push(results[arr[i]])
            }
            
            res.status(201).json({message : "Get questions successfully", data : questions})
            
        } else {
            const error = new Error(`Dont exceed the questions length ${results.length}`);
            error.statusCode = 422;
            throw error;
        }
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}