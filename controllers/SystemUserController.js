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
})

module.exports = { systemUserController }
