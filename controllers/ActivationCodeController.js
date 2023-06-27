const express = require("express");
const {Op} = require("sequelize");
const activationCodeController = express();
const {activationCodesModel} = require("../models/ActivationCodeModel")