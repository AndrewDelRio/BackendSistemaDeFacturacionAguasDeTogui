const express = require('express');
const globalController = express();
const { loginController } = require("./LoginController");
const { emailSenderController } = require('./EmailSenderController');
const { systemUserController } = require('./SystemUserController');
const { subscriberController } = require('./SubscribersController');

globalController.use(loginController);
globalController.use(emailSenderController);
globalController.use(systemUserController);
globalController.use(subscriberController);

module.exports = { globalController };