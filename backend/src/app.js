const express = require('express');
const dotenv = require('dotenv').config();

const router  = require("./routes/usersRouter")
const userRouter = require('./routes/loginRouter');
const favoriteRouter = require("./routes/favoriteRouter");

const app = express();
app.set('port', process.env.PORT || 3000);

const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use('/', router)

app.use('/api', userRouter);
app.use("/api", favoriteRouter);

module.exports = app;
