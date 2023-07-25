const express = require('express');
const financingController = express();
const { Op } = require('sequelize');
const { financingModel } = require('../models/FinancingModel');
const { JWTokenVerification } = require('../middleware/Authentication');

financingController.get('/getAllFinancings', [JWTokenVerification], (req, res) => {
    financingModel.findAll({
        attributes: ['id_financing', 'value_financing', 'cuotes_financing', 'percentage_interest']
    }).then((result) => {
        if (result) {
            res.status(200).json({
                ok: true,
                result: result
            })
        }
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err,
            message: "Error trying to connect to database"
        })
    })
})
module.exports = { financingController }