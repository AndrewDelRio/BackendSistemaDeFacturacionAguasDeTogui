const express = require('express');
const globalController = express();
const { loginController } = require("./LoginController");
const { emailSenderController } = require('./EmailSenderController');
const { systemUserController } = require('./SystemUserController');
const { subscriberController } = require('./SubscribersController');
const { enrollmentController } = require('./EnrollmentController');

globalController.use(loginController);
globalController.use(emailSenderController);
globalController.use(systemUserController);
globalController.use(subscriberController);
globalController.use(enrollmentController);

module.exports = { globalController };