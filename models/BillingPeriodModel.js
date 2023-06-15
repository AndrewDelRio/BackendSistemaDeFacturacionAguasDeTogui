const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Billing_periods';
const options = {};
const attributes = {
    id_activation_code:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    date_initial_period:{
        type: DataTypes.DATE,
        allowNull:false
    },
    date_final_period:{
        type:DataTypes.DATE,
        allowNull:false
    },
    date_payment_max_billing:{
        type:DataTypes.DATE,
        allowNull:false
    },
    date_services_suspension:{
        type:DataTypes.DATE,
        allowNull:false
    },
    billing_period_name:{
        type:DataTypes.STRING(45),
        allowNull:false
    }
};

const billingPeriodModel = sequelize.define(tableName,attributes,options);
module.exports = {billingPeriodModel};