const express = require('express');
const globalController = express();
const { loginController } = require("./LoginController");
const { emailSenderController } = require('./EmailSenderController');
const { systemUserController } = require('./SystemUserController');
const { subscriberController } = require('./SubscribersController');
const { enrollmentController } = require('./EnrollmentController');
const { documentTypeController } = require('./DocumentTypeController');
const { genderController } = require('./GenderController');

globalController.use(loginController);
globalController.use(emailSenderController);
globalController.use(systemUserController);
globalController.use(subscriberController);
globalController.use(enrollmentController);
globalController.use(documentTypeController);
globalController.use(genderController);

module.exports = { globalController };