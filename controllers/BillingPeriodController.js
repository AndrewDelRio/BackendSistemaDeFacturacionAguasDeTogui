const express = require('express')
const billingPeriodController = express()
const { billingPeriodModel } = require('../models/BillingPeriodModel')
const { JWTokenVerification } = require('../middleware/Authentication')
const { Op } = require('sequelize')
const { QueryTypes } = require('@sequelize/core')

billingPeriodController.get('/getLastBillingPeriodID', [JWTokenVerification], (req, res) => {
    const query = 'SELECT f_get_last_billing_period() as id_period';
    billingPeriodModel.sequelize.query(query, {
        type: QueryTypes.SELECT
    }).then((result) => {
        console.log(result)
        if (result[0].id_period) {
            return res.status(200).json({ ok: true, result: result[0] })
        } else {
            return res.status(200).json({ ok: false, message: 'Dont exist billing period' })
        }
    }).catch((err) => {
        res.status(500).json({ ok: false, message: 'Error to try connect to the database', error: err });
    })
})

module.exports = { billingPeriodController };