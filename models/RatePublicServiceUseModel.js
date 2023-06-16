const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'historicals_water_meter';
const options = {};
const attributes = {
    id_rate_public_service_use:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    minimum_limit_basic_consumption:{
        type: DataTypes.INTEGER,
        allowNull:true
    },
    maximun_limit_basic_consumption:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    rate_basic_consumption:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    minimum_limit_supplementary_consumption:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    maximum_limit_supplementary_consumptiom:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    rate_supplementary_consumption:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    minimum_limit_luxury_consumption:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    rate_luxury_consumption:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    fixed_charge_for_public_service_use:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    subsidized_percentage_use_public_service:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    percentage_contribution_use_public_service:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    percentage_surcharge_for_use_of_public_service:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    id_stratum:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_use_public_service:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_domestic_public_service:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
};

const ratePublicServiceUseModel = sequelize.define(tableName,attributes,options);
module.exports = {ratePublicServiceUseModel};