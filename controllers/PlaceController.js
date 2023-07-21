const express = require('express');
const placeController = express();
const { Op, QueryTypes } = require('sequelize');
const { placeModel } = require('../models/PlaceModel');
const { JWTokenVerification } = require('../middleware/Authentication');

placeController.get('/getDepartmentInfo', [JWTokenVerification], (req, res) => {
    placeModel.findAll({
        attributes: ['id_place', 'name_place', 'abbreviation_place', 'type_place'],
        where: { 'type_place': 'DPT' }
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
});

placeController.get('/getPlacesAssociatedToAPlace/:id_place/:type_place', [JWTokenVerification], (req, res) => {
    placeModel.findAll({
        attributes: ['id_place', 'name_place', 'abbreviation_place', 'type_place'],
        where: {
            [Op.and]: {
                id_location: req.params.id_place,
                type_place: req.params.type_place
            }
        }
    }).then(result => {
        console.log(result)
        if (result) {
            res.status(200).json({
                ok: true,
                result: result
            })
        } else {
            res.status(200).json({ ok: false, message: 'Not exist places associated to the search' });
        }
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err,
            code: 501,
            message: "Error trying to connect to database"
        })
    })
})
module.exports = { placeController };