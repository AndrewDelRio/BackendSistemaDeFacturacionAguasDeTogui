const express = require('express');
const economicDestinationController = express();
const { JWTokenVerification } = require('../middleware/Authentication');

economicDestinationController.get('/getEconomicalDestine', [JWTokenVerification], (req, res) => {
    let economicDestination = ['Habitacional', 'Industrial', 'Comercial', 'Agropecuario', 'Minero', 'Cultural', 'Recreacional', 'Salubridad', 'Institucional o Estado', 'Mixto', 'Otros'];
    return res.status(200).json({ ok: true, result: economicDestination });
});

module.exports = { economicDestinationController };