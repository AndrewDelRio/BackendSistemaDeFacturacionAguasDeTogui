const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'bills';
const options = {};
const attributes = {
    id_bills:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    value_total_financings:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    value_total_public_services:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    interest_for_late_payment:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    date_services_suspension:{
        type:DataTypes.DATE,
        allowNull:false
    },
    past_debt:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    value_total_others_charges:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    value_total_bill:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    state_bill:{
        type:DataTypes.BOOLEAN,
        allowNull:false  
    },
    payment_reference_bill:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    date_issue_bill:{
        type:DataTypes.DATETIME,
        allowNull:false
    },
    suspension_service:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    invoice_payment_date:{
        type:DataTypes.DATE,
        allowNull:true
    },
    value_paid_invoice:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    id_billing_period:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_enrollment:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
};

const billModel = sequelize.define(tableName,attributes,options);
module.exports = {billModel};