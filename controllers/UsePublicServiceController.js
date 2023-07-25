const express = require('express');
const usePublicServiceController = express();
const { Op } = require('sequelize');
const { usePublicServiceModel } = require('../models/UsePublicServiceModel');
const { JWTokenVerification } = require('../middleware/Authentication');

usePublicServiceController.get('/getAllUsesPublicServices', [JWTokenVerification], (req, res) => {
    usePublicServiceModel.findAll().then((result) => {
        if (result) {
            res.status(200).json({
                ok: true,
                result: result
            });
        }
    }).catch(err => {
        res.status(500).json({
            ok: false,
            message: "Error to try to connect the database",
            error: err,
        });
    })
})

module.exports = { usePublicServiceController };