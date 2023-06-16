const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'subscribers';
const options = {};
const attributes = {
    id_subscriber:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:false
    },
    document_expedition_date:{
        type: DataTypes.DATE,
        allowNull:false
    },
    birthdate_subscriber:{
        type:DataTypes.DATE,
        allowNull:true
    },
    lastnames_subscriber:{
        type:DataTypes.STRING(45),
        allowNull:false
    },
    names_subscriber:{
        type:DataTypes.STRING(45),
        allowNull:false
    },
    place_expedition_document:{
        type:DataTypes.STRING(200),
        allowNull:false
    },
    gender_subscriber:{
        type:DataTypes.STRING(45),
        allowNull:false
    },
    address_subscriber:{
        type:DataTypes.STRING(45),
        allowNull:false
    },
    email_subscriber:{
        type:DataTypes.STRING(100),
        allowNull:true
    },
    cellphone_subscriber:{
        type:DataTypes.STRING(10),
        allowNull:true
    },
    id_document_type:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
};

const subscriberModel = sequelize.define(tableName,attributes,options);
module.exports = {subscriberModel};