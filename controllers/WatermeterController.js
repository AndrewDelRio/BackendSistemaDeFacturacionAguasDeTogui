const express = require('express');
const waterMeterController = express();
const { Op, where } = require('sequelize');
const { waterMeterModel } = require('../models/WaterMeterModel');
const { JWTokenVerification } = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

waterMeterController.get('/getWatermeter/:idEnrollment', [JWTokenVerification], (req, res) => {
    waterMeterModel.findAll({
        where: {
            [Op.and]: {
                id_enrollment: req.params.idEnrollment,
                state_water_meter: true
            }
        }
    }).then((result) => {
        if (result) {
            res.status(200).json({
                ok: true,
                result: result
            })
        } else {
            res.status(200).json({
                ok: false,
                message: 'The enrollment dont have watermeter'
            })
        }
    }).catch((err) => {
        return res.status(500).json({
            ok: false, error: err, code: 501, message: "Error trying to connect to database"
        })
    })
})

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
        res.status(501).json({ ok: false, message: 'Error to try to add the watermeter', error: err });
    })
})

waterMeterController.post('/updateWatermeter', [JWTokenVerification], (req, res) => {
    waterMeterModel.findOne({
        where: { serial_water_meter: req.body.old_serial_water_meter }
    }).then((result) => {
        if (result) {
            waterMeterModel.update({ state_water_meter: false }, { where: { serial_water_meter: req.body.old_serial_water_meter } }).then((resUpdate => {
                if (resUpdate) {
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
                        res.status(500).json({ ok: false, message: 'Error to try to add the watermeter', error: err });
                    })
                }
            }))
        } else {
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
                res.status(500).json({ ok: false, message: 'Error to try to add the watermeter', error: err });
            })
        }

    }).catch((err) => {
        res.status(500).json({ ok: false, message: 'Error to try to add the watermeter', error: err });
    })
})

module.exports = { waterMeterController }