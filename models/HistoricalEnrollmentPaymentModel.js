const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'historicals_enrollment_payment';
const options = {};
const attributes = {
    id_historical_enrollment_payment:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    value_paid:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    date_payment:{
        type:DataTypes.DATE,
        allowNull:false
    },
    id_enrollment:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
};

const historicalEnrollmentPaymentModel = sequelize.define(tableName,attributes,options);
module.exports = {historicalEnrollmentPaymentModel};