const { sequelize } = require('../database/databaseDriver');
const { DataTypes } = require('sequelize');

const tableName = 'financings';
const options = {};
const attributes = {
    id_financing: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    concept_financing: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    value_financing: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    cuotes_financing: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value_share: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    percentage_interest: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    year_of_validity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

const financingModel = sequelize.define(tableName, attributes, options);
module.exports = { financingModel };