const express = require("express");
const {Op} = require("sequelize");
const loginController = express();
const {systemUserModel} = require("../models/SystemUserModel");
const {roleModel} = require("../models/RoleModel");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");
const { QueryTypes } = require('@sequelize/core');

/**
 * Login function
 * In: email, password
 * Out: Name, rol, last_access 
 */
loginController.post("/login", (req,res) =>{
 let condition = {
    where:{
        access_email_user: req.body.email
    }
 };
 systemUserModel.findOne(condition).then((result) =>{
    if (!result) {
        return res.status(200).json({
            ok:false,
            error: "Not found",
            message: "Correo no registrado en el sistema"
        })
    } else {
        var password = req.body.password;
        let state = password === result.access_password_user;
        if (!state) {
            return res.status(200).json({
                ok:false,
                error: "Incorrect Password",
                message: "Usuario y/o contraseña incorrectos"
            });
        } else {
            let token = jwt.sign({user:result}, process.env.JWT_SIGNATURE, {
                expiresIn: process.env.JWT_EXP_TIME,
            });
            return res.status(200).json({
                ok:true,
                token:token,
                message:{id_system_user: result.id_system_user,names_user:result.names_user,active_state: result.active_state, id_role:result.id_rol,last_access_date: result.last_access_date,last_access_ip_address: result.last_access_ip_address }
            });
        }
    }
 }).catch((err)=>{
    return res.status(500).json({
        ok:false,
        error:err,
        message:"Error to try connect to database"
    })
 });   
});

module.exports = {loginController};