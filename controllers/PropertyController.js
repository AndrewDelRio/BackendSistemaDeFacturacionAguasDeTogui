const express = require('express');
const propertyController = express();
const { Op, QueryTypes } = require('sequelize');
const { propertyModel } = require('../models/propertyModel');
const { JWTokenVerification } = require('../middleware/Authentication');

propertyController.get('/getProperty/:id_property', [JWTokenVerification], (req, res) => {
    const query = 'CALL sp_search_a_property(:id_property)';
    propertyModel.sequelize.query(query, {
        type: QueryTypes.EXEC, replacements: {
            id_property: req.params.id_property
        }
    }).then(result => {
        if (result) {
            res.status(200).json({ ok: true, result: result })
        }
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err,
            message: "Error trying to connect to database"
        })
    })
})
module.exports = { propertyController };