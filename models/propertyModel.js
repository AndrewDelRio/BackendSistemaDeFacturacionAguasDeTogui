const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'properties';
const options = {};
const attributes = {
    id_property_number:{
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull:false,
        autoIncrement:false
    },
    number_property_registration:{
        type: DataTypes.STRING(20),
        allowNull:true
    },
    route_property:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    code_localization_property:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    address_property:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    name_property:{
        type:DataTypes.STRING(45),
        allowNull:true
    },
    destination_economic_property:{
        type:DataTypes.STRING(45),
        allowNull:true
    },
    id_place:{
        type:DataTypes.STRING(15),
        allowNull:false
    },
    id_stratum:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_ownership_condition:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_property_type:{
        type:DataTypes.STRING(5),
        allowNull:false
    }
};

const propertyModel = sequelize.define(tableName,attributes,options);
module.exports = {propertyModel};