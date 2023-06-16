const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'charges';
const options = {};
const attributes = {
    id_charge:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    type_charge:{
        type: DataTypes.STRING(50),
        allowNull:true
    },
    concept_charge:{
        type:DataTypes.STRING(200),
        allowNull:false
    },
    value_charge:{
        type:DataTypes.DOUBLE,
        allowNull:false
    }
};

const chargeModel = sequelize.define(tableName,attributes,options);
module.exports = {chargeModel};

