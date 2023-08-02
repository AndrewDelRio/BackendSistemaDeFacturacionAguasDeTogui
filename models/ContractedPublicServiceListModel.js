const { sequelize } = require('../database/databaseDriver');
const { DataTypes } = require('sequelize');

const tableName = 'contracted_public_services_list';
const options = {};
const attributes = {
    id_enrollment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
    },
    id_domestic_public_service: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
    }

};

const contractedPublicServiceListModel = sequelize.define(tableName, attributes, options);
module.exports = { contractedPublicServiceListModel };

