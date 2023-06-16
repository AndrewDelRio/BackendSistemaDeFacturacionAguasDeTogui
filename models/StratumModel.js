const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'stratums';
const options = {};
const attributes = {
    id_stratum:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    name_stratum:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    number_stratum:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
};

const stratumModel = sequelize.define(tableName,attributes,options);
module.exports = {stratumModel};