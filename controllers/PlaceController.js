const express = require('express');
const placeController = express();
const { Op, QueryTypes } = require('sequelize');
const { placeModel } = require('../models/PlaceModel');
const { JWTokenVerification } = require('../middleware/Authentication');

placeController.get('/getDepartmentsInfo', [JWTokenVerification], (req, res) => {
    const departments = [];
    const query = 'SELECT id_place, name_place, abbreviation_place FROM places where type_place = "DPT"';
    placeModel.sequelize.query(query, {
        type: QueryTypes.SELECT
    }).then(result => {
        if (result) {
            res.status(200).json({
                ok: true,
                result: result
            })
        }
    })
});

placeController.get('/getPlacesAssociatedToAPlace/:id_place', [JWTokenVerification], (req, res) => {
    const query = 'SELECT id_place, name_place, abbreviation_place FROM places p where p.id_location = :id_location'
    placeModel.sequelize.query(query, {
        type: QueryTypes.SELECT, replacements: {
            id_location: req.params.id_place
        }
    }).then(result => {
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
module.exports = { placeController };