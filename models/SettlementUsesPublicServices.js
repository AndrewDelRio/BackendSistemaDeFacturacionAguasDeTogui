const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'settlements_uses_public_services';
const options = {};
const attributes = {
    id_settlement:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    concept_settlement:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    date_settlement:{
        type:DataTypes.DATETIME,
        allowNull:false
    },
    calculation_factor:{
        type:DataTypes.string(50),
        allowNull:false
    },
    basic_consumption_limit:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    basic_consumption:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    rate_basic_consumption:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    complementary_consumption_limit:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    complementary_consumption:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    rate_complementary_consumption:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    luxury_consumption:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    rate_luxury_consumption:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    fixed_charge:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    subsidy:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    contribution:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    overprice:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    subtotal:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    total_liquidation:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    id_enrollment:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_domestic_public_service:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_use_public_service:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
};

const settlementUsesPublicServicesModel = sequelize.define(tableName,attributes,options);
module.exports = {settlementUsesPublicServicesModel};