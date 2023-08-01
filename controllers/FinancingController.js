const express = require('express');
const financingController = express();
const { Op } = require('sequelize');
const { financingModel } = require('../models/FinancingModel');
const { JWTokenVerification } = require('../middleware/Authentication');

financingController.get('/getAllFinancings', [JWTokenVerification], (req, res) => {
    const date = new Date();
    financingModel.findAll({
        attributes: ['id_financing', 'value_financing', 'cuotes_financing', 'percentage_interest', 'year_of_validity'],
        where: { 'year_of_validity': date.getFullYear() }
    }).then((result) => {
        if (result) {
            res.status(200).json({
                ok: true,
                result: result[0]
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