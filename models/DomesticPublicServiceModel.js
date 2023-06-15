const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Domestic_public_services';
const options = {};
const attributes = {
    id_domestic_public_service:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    name_domestic_public_service:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    measurement_unit_domestic_public_service:{
        type:DataTypes.STRING(45),
        allowNull:false
    }
};

const domesticPublicServiceModel = sequelize.define(tableName,attributes,options);
module.exports = {domesticPublicServiceModel};