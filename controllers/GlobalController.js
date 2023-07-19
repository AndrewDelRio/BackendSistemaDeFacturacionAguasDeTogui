const express = require('express');
const globalController = express();
const { loginController } = require("./LoginController");
const { emailSenderController } = require('./EmailSenderController');
const { systemUserController } = require('./SystemUserController');
const { subscriberController } = require('./SubscribersController');
const { enrollmentController } = require('./EnrollmentController');
const { documentTypeController } = require('./DocumentTypeController');
const { genderController } = require('./GenderController');
const { departmentsMunicipalitiesController } = require('./DepartmentsMunicipalitiesController');
const { economicDestinationController } = require('./EconomicDestination');
const { propertyController } = require('./PropertyController');
const { placeController } = require('./PlaceController');

globalController.use(loginController);
globalController.use(emailSenderController);
globalController.use(systemUserController);
globalController.use(subscriberController);
globalController.use(enrollmentController);
globalController.use(documentTypeController);
globalController.use(genderController);
globalController.use(departmentsMunicipalitiesController);
globalController.use(economicDestinationController);
globalController.use(propertyController);
globalController.use(placeController);

module.exports = { globalController };