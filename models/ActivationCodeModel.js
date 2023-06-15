const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Activation_codes';
const options = {};
const attributes = {
    id_activation_code:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    code_generated:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    state:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    generated_timedate:{
        type:DataTypes.DATETIME,
        allowNull:false
    },
    id_system_user:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
};

const activationCodesModel = sequelize.define(tableName,attributes,options);
module.exports = {activationCodesModel};

