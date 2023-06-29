const express = require("express");
const { Op } = require("sequelize");
const loginController = express();
const { systemUserModel } = require("../models/SystemUserModel");
const jwt = require("jsonwebtoken");

/**
 * Login function
 * In: email, password
 * Out: Name, rol, last_access 
 */
loginController.post("/login", (req, res) => {
    let date = req.body.date;
    let ts = new Date(date);
    let hour = ts.getHours();
    const maxAllowedHour = '18';
    let ip_address = req.ip;
    let condition = {
        where: {
            access_email_user: req.body.email
        }
    };
    if (!hour <= maxAllowedHour) {
        return res.status(200).json({
            ok: false,
            error: "Out of time",
            message: "you are out of the time allowed by the system"
        })
    } else {
        systemUserModel.findOne(condition).then((result) => {
            if (!result) {
                return res.status(200).json({
                    ok: false,
                    error: "Not found",
                    message: "Mail not registered in the system"
                })
            } else {
                var password = req.body.password;
                let state = password === result.access_password_user;
                if (!state) {
                    return res.status(200).json({
                        ok: false,
                        error: "Incorrect email/Password",
                        message: "Wrong username and/or password"
                    });
                } else {
                    let token = jwt.sign({ user: result }, process.env.JWT_SIGNATURE, {
                        expiresIn: process.env.JWT_EXP_TIME,
                    });
                    systemUserModel.update(
                        { last_access_date: ('YYYY-MM-DD hh:mm:ss', date_to_database), last_access_ip_address: ip_address },
                        { where: { id_system_user: result.id_system_user } }
                    ).then(rest => {
                        return res.status(200).json({
                            ok: true,
                            token: token,
                            message: { id_system_user: result.id_system_user, names_user: result.names_user, active_state: result.active_state, id_role: result.id_rol, last_access_date: result.last_access_date, last_access_ip_address: result.last_access_ip_address }
                        });
                    }).catch(err => {
                        return res.status(200).json({
                            ok: false,
                            error: "Update Error",
                            message: "Error updating the entry record in the database"
                        })
                    })

                }
            }
        }).catch((err) => {
            return res.status(500).json({
                ok: false,
                error: err,
                message: "Error to try connect to database"
            })
        });
    }
});

module.exports = { loginController };