const express = require('express');
const globalController = express();
const { loginController } = require("./LoginController");
const { emailSenderController } = require('./EmailSenderController');
const { systemUserController } = require('./SystemUserController');

globalController.use(loginController);
globalController.use(emailSenderController);
globalController.use(systemUserController);

module.exports = { globalController };