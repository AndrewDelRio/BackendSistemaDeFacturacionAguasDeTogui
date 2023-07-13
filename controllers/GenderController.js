const express = require('express');
const genderController = express();
const { JWTokenVerification } = require('../middleware/Authentication');

genderController.get('/getGenders', [JWTokenVerification], (req, res) => {
    let genders = ['Masculino', 'Femenino', 'Otro'];
    return res.status(200).json({ ok: true, result: genders });
});

module.exports = { genderController };