const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'roles';
const options = {};
const attributes = {
    id_role:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    name_role:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    abbreviation_role:{
        type: DataTypes.STRING(45),
        allowNull:false
    }
};

const roleModel = sequelize.define(tableName,attributes,options);
module.exports = {roleModel};