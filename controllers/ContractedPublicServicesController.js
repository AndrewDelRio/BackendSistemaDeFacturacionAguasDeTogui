const express = require('express');
const contractedPublicServicesController = express();
const { contractedPublicServiceListModel } = require('../models/ContractedPublicServiceListModel');
const { JWTokenVerification } = require('../middleware/Authentication');

contractedPublicServicesController.post('/addServicesPublicContracted', [JWTokenVerification], (req, res) => {
    const servicesPublicList = req.body.servicePublicList;
    console.log(servicesPublicList)
    console.log(req.body.id_enrollment)
    if (servicesPublicList != null && servicesPublicList.length > 0) {
        let counterInserted = 0;
        servicesPublicList.map(function (servicePublic) {
            let newServicePublicContracted = contractedPublicServiceListModel.build({
                id_enrollment: req.body.id_enrollment,
                id_domestic_public_service: servicePublic
            });
            newServicePublicContracted.save().then((result) => {
                if (result) {
                    counterInserted++;
                    if (counterInserted === servicesPublicList.length) {
                        res.status(200).json({ ok: true, message: 'The public(s) service(s) have been added to the system' })
                    }
                }
            }).catch((err) => {
                console.log(err)
                res.status(500).json({ ok: false, message: 'Error to try connect to the database', error: err });
            })

        })
    }
})

module.exports = { contractedPublicServicesController }