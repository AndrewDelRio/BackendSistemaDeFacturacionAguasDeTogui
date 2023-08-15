const express = require('express')
const chargeController = express()
const { chargeModel } = require('../models/ChargeModel')
const { JWTokenVerification } = require('../middleware/Authentication')
const { QueryTypes } = require('@sequelize/core')


chargeController.get('/getChargeTypes', [JWTokenVerification], (req, res) => {
    const query = 'CALL sp_get_payment_types()';
    chargeModel.sequelize.query(query, QueryTypes.EXEC).then((result) => {
        return res.status(200).json({ ok: true, result: result })
    }).catch((err) => {
        res.status(500).json({ ok: false, message: 'Error to try connect to the database', error: err });
    })
})


chargeController.get('/getChargesByType/:type_charge', /**[JWTokenVerification],*/(req, res) => {
    const query = 'CALL sp_get_charges_by_charge_type(:type_charge)'
    chargeModel.sequelize.query(query, { type: QueryTypes.EXEC, replacements: { type_charge: req.params.type_charge } }).then((result) => {
        return res.status(200).json({ ok: true, result: result })
    }).catch((err) => {
        res.status(500).json({ ok: false, message: 'Error to try connect to the database', error: err });
    })
})

module.exports = { chargeController };