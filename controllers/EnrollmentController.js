const express = require('express');
const enrollmentController = express();
const { Op } = require('sequelize');
const { enrollmentModel } = require('../models/EnrollmentModel');
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
                result: result
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
})

module.exports = { enrollmentController }