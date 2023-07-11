const express = require('express');
const enrollmentController = express();
const { Op } = require('sequelize');
const { enrollmentModel } = require('../models/EnrollmentModel');
const { JWTokenVerification } = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

enrollmentController.get('/getEnrollment/:id_enrollment', [JWTokenVerification], (req, res) => {
    const query = 'CALL sp_search_enrollment_and_water_meter(:id_enrollment)';
    enrollmentModel.sequelize.query(query, {
        type: QueryTypes.EXEC, replacements: {
            id_enrollment: req.params.id_enrollment
        }
    }).then((result) => {
        if (!result.length === 0) {
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