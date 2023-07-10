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
        type: QueryTypes.SELECT, replacements: {
            id_subscriber: req.params.idSubscriber
        }
    }).then((result) => {
        if (result) {
            const queryEnrollments = 'CALL sp_search_list_enrollments(:id_subscriber)';
            enrollmentModel.sequelize.query(queryEnrollments, {
                type: QueryTypes.SELECT, replacements: {
                    id_subscriber: req.params.idSubscriber
                }
            }).then((resultEnrollments) => {
                if (resultEnrollments) {
                    result[0].listEnrollments = resultEnrollments;
                    res.status(200).json({
                        ok: true,
                        result: result
                    })
                } else {
                    res.status(200).json({
                        ok: true,
                        message: "ID subscriber don't have enrollments associated"
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
    })
})

module.exports = { subscriberController };