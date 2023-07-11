const express = require('express');
const documentTypeController = express();
const { Op } = require('sequelize');
const { documentTypeModel } = require('../models/DocumentTypeModel');
const { JWTokenVerification } = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

documentTypeController.get('/getDocumentType', [JWTokenVerification], (req, res) => {
    documentTypeModel.findAll().then((result) => {
        if (result) {
            return res.status(200).json({
                ok: true,
                result: result
            })
        } else {
            return res.status(400).json({
                ok: false,
                message: 'The information could not be consulted'
            })
        }
    }).catch(er => {
        return res.status(500).json({
            ok: false,
            error: err,
            message: "Error to try connect to database"
        })
    })
})

module.exports = { documentTypeController };