const express = require('express');
const stratumController = express();
const { Op } = require('sequelize');
const { stratumModel } = require('../models/StratumModel');
const { JWTokenVerification } = require('../middleware/Authentication');

stratumController.get('/getStratums', [JWTokenVerification], (req, res) => {
    stratumModel.findAll().then(result => {
        if (result) {
            res.status(200).json({
                ok: true,
                result: result
            })
        } else {
            res.status(404).json({
                ok: false,
                message: 'Not found data'
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

module.exports = { stratumController };