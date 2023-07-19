const express = require('express');
const ownershipConditionController = express();
const { Op } = require('sequelize');
const { ownershipConditionModel } = require('../models/OwnershipConditionModel');
const { JWTokenVerification } = require('../middleware/Authentication');

ownershipConditionController.get('/getOwnerShipConditions', [JWTokenVerification], (req, res) => {
    ownershipConditionModel.findAll().then(result => {
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
module.exports = { ownershipConditionController };