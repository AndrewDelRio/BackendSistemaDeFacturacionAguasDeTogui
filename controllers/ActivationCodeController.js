const express = require("express");
const { Op } = require("sequelize");
const activationCodeController = express();
const { activationCodesModel } = require("../models/ActivationCodeModel");
const { JWTokenVerification } = require("../middleware/Authentication");

activationCodeController.post("/activationCode", (req, res) => {
    let condition = {

    }
});

module.exports = { activationCodeController };
