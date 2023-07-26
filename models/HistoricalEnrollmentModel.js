const { sequelize } = require('../database/databaseDriver');
const { DataTypes } = require('sequelize');

const tableName = 'historical_enrollment';
const options = {};
const attributes = {
    id_hstorical_enrollment: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    date_operation: {
        type: DataTypes.DATE,
        allowNull: false
    },
    type_operation: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    observations: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    id_enrollment: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

const historicalEnrollmentModel = sequelize.define(tableName, attributes, options);
module.exports = { historicalEnrollmentModel };