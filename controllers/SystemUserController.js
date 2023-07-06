const express = require("express");
const { Op } = require("sequelize");
const systemUserController = express();
const { systemUserModel } = require("../models/SystemUserModel");
const { JWTokenVerification } = require('../middleware/Authentication')

systemUserController.post("/update-password", [JWTokenVerification], (req, res) => {
    let condition = {
        where: {
            [Op.and]: [
                { id_system_user: req.body.id_system_user },
                { access_password_user: req.body.actual_password }
            ]
        }
    };
    systemUserModel.findOne(condition).then((result) => {
        if (!result) {
            return res.status(200).json({
                ok: false,
                error: "Incorrect password/user ID",
                message: "Wrong password or ID user"
            });
        } else {
            systemUserModel.update(
                { access_password_user: req.body.new_password },
                { where: { id_system_user: req.body.id_system_user } }
            ).then((rest) => {
                if (!rest) {
                    return res.status(200).json({
                        ok: false,
                        error: "No update password",
                        message: "Could not update password"
                    })
                } else {
                    return res.status(200).json({
                        ok: true,
                        message: "password updated successfully"
                    })
                }
            }).catch((err) => {
                return res.status(500).json({
                    ok: false,
                    error: err,
                    message: "Error trying to update password"
                })
            })
        }
    }).catch((err) => {
        return res.status(500).json({
            ok: false,
            error: err,
            message: "Error to try connect to database"
        })
    })
});

systemUserController.post("/update-personal-data", [JWTokenVerification], (req, res) => {
    let condition = {
        where: {
            id_system_user: req.body.id_system_user
        }
    };
    systemUserModel.findOne(condition).then((result) => {
        if (!result) {
            return res.status(200).json({
                ok: false,
                error: " Not found",
                message: "User not found"
            });
        } else {
            systemUserModel.update(
                {
                    personal_email_user: req.body.personal_email_user,
                    phone_number_user: req.body.phone_number_user
                },
                { where: { id_system_user: req.body.id_system_user } }
            ).then((rest) => {
                if (!rest) {
                    return res.status(200).json({
                        ok: false,
                        error: "No update personal data",
                        message: "Could not update personal information"
                    })
                } else {
                    return res.status(200).json({
                        ok: true,
                        message: "Personal information updated successfully"
                    })
                }
            }).catch((err) => {
                return res.status(500).json({
                    ok: false,
                    error: err,
                    message: "Error trying to update personal data"
                })
            })
        }
    })
});

module.exports = { systemUserController }
