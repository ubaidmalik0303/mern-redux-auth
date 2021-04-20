require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


//database connection
mongoose
    .connect(
        'mongodb+srv://admin:admin@cluster0.kemen.mongodb.net/task?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    })


//middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors())


//Routes
app.use('/', require('./routes/users'));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));









