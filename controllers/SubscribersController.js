const express = require('express');
const subscriberController = express();
const { Op } = require('sequelize');
const { subscriberModel } = require('../models/SubscriberModel');
const { enrollmentModel } = require('../models/EnrollmentModel');
const { JWTokenVerification } = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

subscriberController.get('/getSubscriber/:idSubscriber', [JWTokenVerification], (req, res) => {
    const query = 'CALL sp_search_subscriber(:id_subscriber)';
    subscriberModel.sequelize.query(query, {
        type: QueryTypes.EXEC, replacements: {
            id_subscriber: req.params.idSubscriber
        }
    }).then((result) => {
        if (!(result.length === 0)) {
            const queryEnrollments = 'CALL sp_search_list_enrollments(:id_subscriber)';
            enrollmentModel.sequelize.query(queryEnrollments, {
                type: QueryTypes.EXEC, replacements: {
                    id_subscriber: req.params.idSubscriber
                }
            }).then((resultEnrollments) => {
                if (!(resultEnrollments.length === 0)) {
                    result[0].listEnrollments = resultEnrollments;
                    res.status(200).json({
                        ok: true,
                        result: result[0]
                    })
                } else {
                    result[0].listEnrollments = [];
                    res.status(200).json({
                        ok: true,
                        result: result[0]
                    })
                }

            });
        } else {
            res.status(200).json({ ok: false, message: "ID subscriber don't exist" });
        }
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            error: err,
            message: "Error to try connect to database"
        })
    });
});

/**
 * Add a subscriber
 */
subscriberController.post('/addSubscriber', [JWTokenVerification], (req, res) => {
    let idSubscriber = Number(req.body.id_subscriber);
    let newSubscriber = subscriberModel.build({
        id_subscriber: Number(req.body.id_subscriber),
        document_expedition_date: req.body.document_expedition_date,
        birthdate_subscriber: req.body.birthdate_subscriber,
        lastnames_subscriber: req.body.lastnames_subscriber,
        names_subscriber: req.body.names_subscriber,
        place_expedition_document: req.body.place_expedition_document,
        gender_subscriber: req.body.gender_subscriber,
        address_subscriber: req.body.address_subscriber,
        email_subscriber: req.body.email_subscriber,
        cellphone_subscriber: req.body.cellphone_subscriber,
        id_document_type: Number(req.body.id_document_type)
    });
    subscriberModel.findByPk(idSubscriber).then((result) => {
        if (!result) {
            newSubscriber.save().then((savedSubscriber) => {
                res.status(200).json({ ok: true, resume: savedSubscriber, message: 'The subscriber has been added Correcttly' });
            }).catch((err) => {
                res.status(500).json({ ok: false, message: 'Error to add the subscriber', error: err })
            });
        } else {
            res.status(200).json({ ok: false, message: 'The subscriber already exists' });
        }
    }).catch((err) => {
        res.status(500).json({ ok: false, message: 'Error to try to connect to the database', error: err });
    });
});

/**
 * Update subscriber information
 */
subscriberController.post('/updateSubscriber', [JWTokenVerification], (req, res) => {
    subscriberModel.findByPk(req.body.id_subscriber).then((result) => {
        if (result) {
            result.address_subscriber = req.body.address_subscriber;
            result.email_subscriber = req.body.email_subscriber;
            result.cellphone_subscriber = req.body.cellphone_subscriber;
            result.save().then(() => {
                res.status(200).json({ ok: true, message: 'The subscriber dates have been update correctly' });
            }).catch((err) => {
                res.status(500).json({ ok: false, message: 'Error to try update the subscriber dates', error: err })
            });
        } else {
            res.status(200).json({ ok: false, message: 'The subscriber dont exist in teh system' });
        }
    }).catch((err) => {
        res.status(500).json({ ok: false, message: 'Error to try to connect to the database', error: err })
    })
})

subscriberController.get('/getAllSubscribers', [JWTokenVerification], (req, res) => {
    subscriberModel.findAll({ attributes: ['id_subscriber', 'names_subscriber', 'lastnames_subscriber'] }).then((result) => {
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

module.exports = { subscriberController };