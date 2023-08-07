import express from 'express'
const billingController = express()
import { billModel } from '../models/BillModel'
import { JWTokenVerification } from '../middleware/Authentication'
import { Op } from 'sequelize'
import { QueryTypes } from '@sequelize/core'

billingController.get('/getInvoiceLastPeriod', [JWTokenVerification], (req, res) => {
    const query = 'CALL get_invoice_by_billing_period(get_last_billing_period())';
    billModel.sequelize.query(query, { type: QueryTypes.EXEC }).then((result) => {
        if (result) {
            res.status(200).json({ ok: true, result: result })
        }
    })
})