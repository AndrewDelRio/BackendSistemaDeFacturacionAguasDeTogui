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
        if (result[0].id_period) {
            return res.status(200).json({ ok: true, result: result[0] })
        } else {
            return res.status(200).json({ ok: false, message: 'Dont exist billing period' })
        }
    }).catch((err) => {
        res.status(500).json({ ok: false, message: 'Error to try connect to the database', error: err });
    })
})

billingPeriodController.get('/getStructuredDateFromAPeriod/:id_period', [JWTokenVerification], (req, res) => {
    const query = 'SELECT f_get_structured_date_from_a_billing_period(:id_period) as structured_date';
    billingPeriodModel.sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: { id_period: req.params.id_period }
    }).then((result) => {
        if (result) {
            res.status(200).json({ ok: true, result: result[0] })
        }
    }).catch((err) => {
        res.status(500).json({ ok: false, message: 'Error to try connect to the database', error: err });
    })
})

billingPeriodController.get('/projectTheNextBillingPeriod', [JWTokenVerification], (req, res) => {
    const query = 'CALL sp_project_next_billing_period()';
    billingPeriodModel.sequelize.query(query, {
        type: QueryTypes.EXEC
    }).then((result) => {
        if (result) {
            res.status(200).json({ ok: true, result: result })
        }
    }).catch((err) => {
        res.status(500).json({ ok: false, message: 'Error to try connect to the database', error: err });
    })
})

module.exports = { billingPeriodController };