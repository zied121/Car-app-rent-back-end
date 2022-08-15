const express = require('express');
const connectDb = require('./config/ConnectDb');
const app = express();
const userRouter = require('./routes/UserRoutes');
require("dotenv").config({
    path: "./config/.env"
});

const port = process.env.port ||6000;
app.listen(port, (error) => {
    (error) ? console.log('server is failed'): console.log('server is running on port ' + port);
});
connectDb();
app.use(express.json());

app.use('/api', userRouter);