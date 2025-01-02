const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser =require("cookie-parser")
const api = require("./Routes/route");
const path = require('path')
require('dotenv').config();



const app =express()
app.use(cors({
    origin: 'http://localhost:3000', // Remove trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Optional: add headers you expect
    credentials: true, // This is the key part
  }));


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mongoose connection

const PORT = process.env.PORT ;
const dbConnectionString = process.env.DB_url;

mongoose
    .connect(dbConnectionString)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((error) => console.error('MongoDB connection error:', error));
    app.use("/", api)



app.listen(PORT,()=>console.log(`Server is connected to ${PORT}`))