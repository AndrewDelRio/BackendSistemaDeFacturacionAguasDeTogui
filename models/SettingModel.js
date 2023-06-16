const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'settings';
const options = {};
const attributes = {
    id_setting:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    name_of_setting:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    value_setting:{
        type: DataTypes.STRING(2000),
        allowNull:true
    }
};

const settingModel = sequelize.define(tableName,attributes,options);
module.exports = {settingModel};