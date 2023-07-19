const express = require('express');
const propertyController = express();
const { Op } = require('sequelize');
const { propertyModel } = require('../models/propertyModel');
const { JWTokenVerification } = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

module.exports = { propertyController };