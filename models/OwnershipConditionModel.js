const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'ownership_conditions';
const options = {};
const attributes = {
    id_ownership_condition:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:false
    },
    name_ownership_condition:{
        type: DataTypes.STRING(2000),
        allowNull:false
    }
};

const ownershipConditionModel = sequelize.define(tableName,attributes,options);
module.exports = {ownershipConditionModel};