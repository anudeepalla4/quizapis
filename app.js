const express = require('express');
const PORT = process.env.PORT || 8080
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/makeQuiz');
const takeQuizRoutes = require('./routes/takeQuiz');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// app.use('/', (req, res, next) => {
//     res.send("connected success")
// })

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/quiz', takeQuizRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message, data: error.data })
})

mongoose.connect('mongodb+srv://anudeep:anudeep@cluster.jpiio.mongodb.net/quiz?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    app.listen(PORT);
    console.log('connected')
}).catch(err => {
    console.log(err.message)
})