const { sequelize } = require('../database/databaseDriver');
const { DataTypes } = require('sequelize');

const tableName = 'water_meters';
const options = {};
const attributes = {
    serial_water_meter: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    brand_water_meter: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    diameter_water_meter: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    calibration_percentage_water_meter: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    date_calibration_water_meter: {
        type: DataTypes.DATE,
        allowNull: false
    },
    state_water_meter: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    id_enrollment: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

const waterMeterModel = sequelize.define(tableName, attributes, options);
module.exports = { waterMeterModel };