const { Sequelize } = require('sequelize');
const { dbUserName, dbPassword, dbName, dbHost, dbPort } = require('../config/config');

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    port: dbPort,
    logging: false,
    timezone: '-05:00',
    define: {
        freezeTableName: true,
        timestamps: false
    }
});
module.exports = { sequelize };