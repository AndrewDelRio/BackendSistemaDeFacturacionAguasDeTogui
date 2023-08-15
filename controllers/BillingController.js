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

billingController.post('/getPaidBillings', [JWTokenVerification], (req, res) => {
    const billingList = req.body.payment_list;
    let counterUpdatedBillings = 0;
    const query = 'CALL sp_update_invoice(:id_bill, :invoice_payment_date)';
    billingList.map(function (billing) {
        billModel.sequelize.query(query, {
            type: QueryTypes.EXEC,
            replacements: { id_bill: billing.id_bill, invoice_payment_date: billing.invoice_payment_date }
        }).then((result) => {
            counterUpdatedBillings++;
            if (counterUpdatedBillings === billingList.length) {
                return res.status(200).json({ ok: true, message: 'Bills updated' });
            }
        }).catch((err) => {
            return res.status(400).json({ ok: false, err: err, message: "Error to try connect to database" })
        })
    })
})

module.exports = { billingController }