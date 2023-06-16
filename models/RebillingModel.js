const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'rebillings';
const options = {};
/**
 * `date_request` DATE NOT NULL,
  `id_billing` BIGINT NOT NULL,
  `id_rebilling` INT NOT NULL,
  `state_rebilling` VARCHAR(45) NOT NULL,
  `observations` VARCHAR(20000) NULL,
 */
const attributes = {
    date_request:{
        type: DataTypes.DATE,
        primaryKey: true,
        allowNull:false,
        autoIncrement:false
    },
    id_billing:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:false
    },
    id_rebilling:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:false
    },
    state_rebilling:{
        type:DataTypes.STRING(45),
        allowNull:false
    },
    observations:{
        type:DataTypes.STRING(20000),
        allowNull:true
    }
};

const rebillingModel = sequelize.define(tableName,attributes,options);
module.exports = {rebillingModel};