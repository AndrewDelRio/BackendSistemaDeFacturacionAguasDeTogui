const express = require('express');
const propertyController = express();
const { Op, QueryTypes } = require('sequelize');
const { propertyModel } = require('../models/propertyModel');
const { JWTokenVerification } = require('../middleware/Authentication');

propertyController.get('/getProperty/:id_property', [JWTokenVerification], (req, res) => {
    const query = 'CALL sp_search_a_property(:id_property)';
    propertyModel.sequelize.query(query, {
        type: QueryTypes.EXEC, replacements: {
            id_property: req.params.id_property
        }
    }).then((result) => {
        if (!(result.length === 0)) {
            const queryEnrollments = 'CALL sp_search_list_enrollments_associated_to_a_property(:id_property)';
            propertyModel.sequelize.query(queryEnrollments, {
                type: QueryTypes.EXEC, replacements: {
                    id_property: req.params.id_property
                }
            }).then((resultEnrollments) => {
                if (!(resultEnrollments.length === 0)) {
                    result[0].listEnrollments = resultEnrollments;
                    res.status(200).json({
                        ok: true,
                        result: result[0]
                    })
                } else {
                    result[0].listEnrollments = [];
                    res.status(200).json({
                        ok: true,
                        result: result[0]
                    })
                }

            });
        } else {
            res.status(200).json({ ok: false, message: "ID enrollment don't exist" });
        }
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err,
            message: "Error trying to connect to database"
        })
    })
})

propertyController.post('/addProperty', [JWTokenVerification], (req, res) => {
    let newProperty = propertyModel.build({
        id_property_number: req.body.id_property_number,
        number_property_registration: req.body.number_property_registration,
        route_property: req.body.route_property,
        code_localization_property: req.body.code_localization_property,
        address_property: req.body.address_property,
        name_property: req.body.name_property,
        destination_economic_property: req.body.destination_economic_property,
        id_place: req.body.id_place,
        id_stratum: req.body.id_stratum,
        id_ownership_condition: req.body.id_ownership_condition,
        id_property_type: req.body.id_property_type
    });
    propertyModel.findByPk(req.body.id_property_number).then(result => {
        if (!result) {
            newProperty.save().then(resultProperty => {
                if (resultProperty) {
                    res.status(200).json({
                        ok: true,
                        message: "The property has been successfully registered ",
                    });
                }
            }).catch(err => {
                res.status(500).json({
                    ok: false,
                    message: "Error to try to add the property",
                    error: err,
                });
            })
        } else {
            res.status(200).json({ ok: false, message: "The property already exists" });
        }
    }).catch(err => {
        res.status(500).json({
            ok: false,
            message: "Error trying to connect to database",
            error: err,
        });
    })
})

propertyController.post('/updateProperty', [JWTokenVerification], (req, res) => {
    propertyModel.findOne({
        where: {
            id_property_number: req.body.id_property_number
        }
    }).then((result) => {
        if (result) {
            result.name_property = req.body.name_property;
            result.destination_economic_property = req.body.destination_economic_property;
            result.code_localization_property = req.body.code_localization_property;
            result.id_stratum = req.body.id_stratum;
            result.route_property = req.body.route_property;
            result.id_ownership_condition = req.body.id_ownership_condition;
            result.save().then(() => {
                res.status(200).json({
                    ok: true,
                    message:
                        "The information has been updated",
                });
            }).catch(err => {
                res.status(500).json({
                    ok: false,
                    message: "Error to trying to update the information",
                    error: err,
                });
            })
        } else {
            res.status(200).json({ ok: false, message: "The property doesn't exist" });
        }
    }).catch(err => {
        res.status(500).json({
            ok: false,
            message: "Error to try to connect the database",
            error: err,
        });
    })
});

propertyController.get('/getAllProperties', [JWTokenVerification], (req, res) => {
    propertyModel.findAll({
        attributes: ['id_property_number', 'name_property']
    }).then((result) => {
        if (result) {
            res.status(200).json({
                ok: true,
                result: result
            });
        }
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            message: "Error to try to connect the database",
            error: err,
        });
    })
})
module.exports = { propertyController };