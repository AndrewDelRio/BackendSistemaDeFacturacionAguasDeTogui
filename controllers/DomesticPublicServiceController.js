const express = require('express');
const domesticPublicServiceController = express();
const { Op } = require('sequelize');
const { domesticPublicServiceModel } = require('../models/DomesticPublicServiceModel');
const { JWTokenVerification } = require('../middleware/Authentication');

domesticPublicServiceController.get('/getAllDomesticPublicServices', [JWTokenVerification], (req, res) => {
    domesticPublicServiceModel.findAll({
        attributes: ['id_domestic_public_service', 'name_domestic_public_service']
    }).then((result) => {
        if (result) {
            res.status(200).json({
                ok: true,
                result: result
            });
        }
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            message: "Error to try to connect the database",
            error: err,
        });
    })
})

module.exports = { domesticPublicServiceController }