const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizStoreSchema = new Schema({
    question : {
        type : String,
        required : true
    },
    answers : {
        type : Array,
        required : true
    },
    correctAnswer : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Quizstore', quizStoreSchema)