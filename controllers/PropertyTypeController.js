const express = require('express');
const propertyTypeController = express();
const { Op } = require('sequelize');
const { propertyTypeModel } = require('../models/PropertyTypeModel');
const { JWTokenVerification } = require('../middleware/Authentication');

propertyTypeController.get('/getPropertyTypes', [JWTokenVerification], (req, res) => {
    propertyTypeModel.findAll().then(result => {
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

module.exports = { propertyTypeController };