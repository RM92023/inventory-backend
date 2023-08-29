const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const contactRoute = require('./routes/contactRoute');
const errorHandler = require('./middleWare/errorMiddleware');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

const URL = process.env.FRONTEND_URL;

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: [URL, 'https://inventorymaster.vercel.app'],//esto es para publicar y vincular backend y frontend
    credentials: true,
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes Middlewares
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/contactus', contactRoute);

//Routes
app.get('/', (req, res) => {
    res.send('Home page');
});

//Error Middlewares
app.use(errorHandler);

//connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err));
