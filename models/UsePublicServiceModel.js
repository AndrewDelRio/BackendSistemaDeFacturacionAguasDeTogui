const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'uses_public_services';
const options = {};
const attributes = {
    id_use_public_service:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    name_use_public_service:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    abreviation_use_public_service:{
        type: DataTypes.STRING(3),
        allowNull:false
    }
};

const usePublicServiceModel = sequelize.define(tableName,attributes,options);
module.exports = {usePublicServiceModel};