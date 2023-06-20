const express = require("express");
const {Op} = require("sequelize");
const loginController = express();
const {systemUserModel} = require("../models/SystemUserModel");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");
const { QueryTypes } = require('@sequelize/core');

/**
 * Login function
 * In: email, password
 * Out: Name, rol, last_access 
 */
loginController.post("/login", (req,res) =>{
    const query = 'CALL `sp_login`(:access_email_user, :access_password_user)';
    systemUserModel.sequelize.query(
        query,
        {type: QueryTypes.select,
            replacements:{access_email_user: req.body.email, access_password_user: req.body.password}
        }
    ).then((result) =>{
        let token = jwt.sign({ user: result }, process.env.JWT_SIGNATURE, {
            expiresIn: process.env.JWT_EXP_TIME,
        });
        return res.status(200).json({ok: true,token: token, result
        });
    }).catch((err) =>{
        console.log(err);
        return res.status(400).json({ok: false, message: 'Error al conectarse a la base de datos', err: err});
    })
}
);

module.exports = {loginController};