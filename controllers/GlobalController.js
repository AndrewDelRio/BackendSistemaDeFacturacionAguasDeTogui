const express = require('express');
const globalController = express();
const { loginController } = require("./LoginController");
const { emailSenderController } = require('./EmailSenderController');

globalController.use(loginController);
globalController.use(emailSenderController);

module.exports = { globalController };