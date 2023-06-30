const express = require('express');
const emailSenderController = express();
const emailSenderModel = require('../email/EmailSender');

emailSenderController.get('/sendEmail', (req, res) => {
    emailSenderModel.sendEmail();
});

module.exports = { emailSenderController };