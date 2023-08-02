const { sequelize } = require('../database/databaseDriver');
const { DataTypes } = require('sequelize');

const tableName = 'enrollments';
const options = {};
const attributes = {
    id_enrollment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    date_adward: {
        type: DataTypes.DATE,
        allowNull: true
    },
    state_enrollment: {
        type: DataTypes.STRING(4),
        allowNull: true
    },
    id_financing: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_property_number: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    id_subscriber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cuotes_financing: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_use_public_service: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

const enrollmentModel = sequelize.define(tableName, attributes, options);
module.exports = { enrollmentModel };