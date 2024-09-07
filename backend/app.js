require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");


const userRoute = require('./src/routes/user');
const docRoute = require('./src/routes/document');

const app = express();
const server = http.createServer(app);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use('/public', express.static('public'));
app.use('/upload', express.static('upload'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.HOST_ORIGIN || "http://localhost:3000", }));

const db = require("./src/models");

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.use('/api/users', userRoute);
app.use('/api/documents', docRoute);

//route-->controller-->model(db)

module.exports = { app, server };