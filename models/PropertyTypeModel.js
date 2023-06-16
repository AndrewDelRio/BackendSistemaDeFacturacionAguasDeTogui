const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'properties_type';
const options = {};
const attributes = {
    id_property_type:{
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull:false,
        autoIncrement:false
    },
    property_type_name:{
        type: DataTypes.STRING(45),
        allowNull:false
    }
};

const propertyTypeModel = sequelize.define(tableName,attributes,options);
module.exports = {propertyTypeModel};