const express = require('express');
const waterMeterController = express();
const { Op } = require('sequelize');
const { waterMeterModel } = require('../models/WaterMeterModel');
const { JWTokenVerification } = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');


waterMeterController.post('/addWaterMeter', [JWTokenVerification], (req, res) => {
    let newWaterMeter = waterMeterModel.build({
        serial_water_meter: req.body.serial_water_meter,
        brand_water_meter: req.body.brand_water_meter,
        diameter_water_meter: req.body.diameter_water_meter,
        calibration_percentage_water_meter: req.body.calibration_percentage_water_meter,
        date_calibration_water_meter: req.body.date_calibration_water_meter,
        state_water_meter: true,
        id_enrollment: req.body.id_enrollment
    });
    newWaterMeter.save().then((result) => {
        if (result) {
            res.status(200).json({ ok: true, message: 'The watermeter has been added to the system' });
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ ok: false, message: 'Error to try to add the watermeter', error: err });
    })
})

module.exports = { waterMeterController }