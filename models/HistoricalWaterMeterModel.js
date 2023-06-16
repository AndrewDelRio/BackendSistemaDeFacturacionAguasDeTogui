const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'historicals_water_meter';
const options = {};
const attributes = {
    id_historical_water_meter:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    previous_reading_water_meter:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    previous_date_water_meter:{
        type:DataTypes.DATE,
        allowNull:false
    },
    current_reading_water_meter:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    current_date_water_meter:{
        type:DataTypes.DATE,
        allowNull:true
    },
    status_reading:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    total_consumption_water_meter:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    observations:{
        type:DataTypes.STRING(2000),
        allowNull:true
    },
    id_water_meter:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    id_system_user:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
};

const historicalWaterMeterModel = sequelize.define(tableName,attributes,options);
module.exports = {historicalWaterMeterModel};