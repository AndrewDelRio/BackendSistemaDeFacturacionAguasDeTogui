const express = require('express')
const billingController = express()
const { billModel } = require('../models/BillModel')
const { JWTokenVerification } = require('../middleware/Authentication')
const { Op } = require('sequelize')
const { QueryTypes } = require('@sequelize/core')

billingController.get('/getInvoiceLastPeriod/:id_period', [JWTokenVerification], (req, res) => {
    const query = 'CALL sp_get_invoice_by_billing_period(:id_period)';
    billModel.sequelize.query(query, {
        type: QueryTypes.EXEC, replacements: {
            id_period: req.params.id_period
        }
    }).then((result) => {
        if (result) {
            res.status(200).json({ ok: true, result: result })
        }
    }).catch((err) => {
        return res.status(500).json({
            ok: false,
            error: err,
            message: "Error to try connect to database"
        })
    })
})

module.exports = { billingController }