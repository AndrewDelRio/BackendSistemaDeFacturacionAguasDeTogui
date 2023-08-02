const express = require('express');
const enrollmentController = express();
const { Op } = require('sequelize');
const { enrollmentModel } = require('../models/EnrollmentModel');
const { historicalEnrollmentModel } = require('../models/HistoricalEnrollmentModel');
const { JWTokenVerification } = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

enrollmentController.get('/getEnrollment/:idEnrollment', [JWTokenVerification], (req, res) => {
    const query = 'CALL sp_search_enrollment_and_water_meter(:idEnrollment)';
    enrollmentModel.sequelize.query(query, {
        type: QueryTypes.EXEC, replacements: {
            idEnrollment: req.params.idEnrollment
        }
    }).then((result) => {
        if (!(result.length === 0)) {
            return res.status(200).json({
                ok: true,
                result: result[0]
            })
        } else {
            return res.status(200).json({
                ok: false,
                message: 'ID enrollment dont exist'
            })
        }
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err,
            message: "Error to try connect to database"
        })
    })
});

enrollmentController.post('/addEnrollment', [JWTokenVerification], (req, res) => {
    let newEnrollment = enrollmentModel.build({
        id_enrollment: null,
        date_adward: req.body.date_adward,
        state_enrollment: 'Adju',
        id_financing: Number(req.body.id_financing),
        id_property_number: req.body.id_property_number,
        id_subscriber: Number(req.body.id_subscriber),
        cuotes_financing: Number(req.body.cuotes_financing),
        id_use_public_service: Number(req.body.id_use_public_service)
    });
    newEnrollment.save().then((result) => {
        if (result) {
            let newHistoricalEnrollment = historicalEnrollmentModel.build({
                id_historical_enrollment: null,
                date_operation: new Date(),
                type_operation: 'Adjudicada',
                observations: '',
                id_enrollment: result.id_enrollment
            });
            newHistoricalEnrollment.save().then((historicalResult) => {
                if (historicalResult) {
                    res.status(200).json({ ok: true, message: 'The enrollment has been added to the system', result: result.id_enrollment });
                } else {
                    res.status(500).json({ ok: false, message: 'Error to try add the historical enrollment' });
                }
            }).catch((err) => {
                res.status(500).json({ ok: false, message: 'Error to try to add the enrollment', error: err });
            })
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ ok: false, message: 'Error to try connect to the database', error: err });
    })
})

enrollmentController.get('/getEnrollmentStates', [JWTokenVerification], (req, res) => {
    let enrollmentsStateList = ['Adjudicada', 'En instalación', 'Activa', 'Suspensión impuesta', 'Suspensión temporal', 'Cancelada'];
    return res.status(200).json({ ok: true, result: enrollmentsStateList });
})

enrollmentController.post('/updateEnrollment', [JWTokenVerification], (req, res) => {
    enrollmentModel.findOne({
        where: { id_enrollment: req.body.id_enrollment }
    }).then((result) => {
        if (result) {
            result.state_enrollment = req.body.state_enrollment
            result.id_property_number = req.body.id_property_number
            result.id_subscriber = req.body.id_subscriber
            result.id_use_public_service = req.body.id_use_public_service
            result.save().then((resultUpdating) => {
                if (resultUpdating) {
                    let newHistoricalEnrollment = historicalEnrollmentModel.build({
                        id_historical_enrollment: null,
                        date_operation: new Date(),
                        type_operation: resultUpdating.state_enrollment,
                        observations: '',
                        id_enrollment: resultUpdating.id_enrollment
                    });
                    newHistoricalEnrollment.save().then((resultHistorical) => {
                        if (resultHistorical) {
                            res.status(200).json({ ok: true, message: 'The dates has been updated' });
                        } else {
                            res.status(500).json({ ok: false, message: 'Error to try update the information' });
                        }
                    })
                } else {
                    res.status(500).json({ ok: false, message: 'Error to try update the enrollment' });
                }
            }).catch((err) => {
                res.status(500).json({ ok: false, message: 'Error to try update the enrollment' });
            })
        } else {
            return res.status(200).json({ ok: false, message: 'The ID enrollment dont exists' });
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ ok: false, message: 'Error to try connect to the database', error: err });
    })
})

module.exports = { enrollmentController }