const express = require('express');
const connectDb = require('./config/ConnectDb');
const app = express();
const cors = require('cors');
const adminroute = require('./Routes/adminRoutes');
const authRouter = require('./routes/AuthRoutes');
const carRouter = require('./routes/CarRoutes');
const postRouter = require('./routes/PostRoutes');
const userRouter=require('./Routes/userRoutes');

require("dotenv").config({
    path: "./config/.env"
});

const port = process.env.port ||5000;
app.listen(port, (error) => {
    (error) ? console.log('server is failed'): console.log('server is running on port ' + port);
});
connectDb();
app.use(express.json());
app.use(cors());

app.use('/api', adminroute);
app.use('/api', authRouter);
app.use('/api', carRouter);
app.use('/api', postRouter);
app.use('/api',userRouter);

