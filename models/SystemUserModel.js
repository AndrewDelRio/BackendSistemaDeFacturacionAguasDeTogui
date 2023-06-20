const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'system_users';
const options = {};
const attributes = {
    id_system_user:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:false
    },
    document_expedition_date:{
        type: DataTypes.DATE,
        allowNull:false
    },
    birthdate_user:{
        type:DataTypes.DATE,
        allowNull:true
    },
    lastnames_user:{
        type:DataTypes.STRING(45),
        allowNull:false
    },
    names_user:{
        type:DataTypes.STRING(45),
        allowNull:false
    },
    place_expedition_document:{
        type:DataTypes.STRING(200),
        allowNull:false
    },
    gender_user:{
        type:DataTypes.STRING(45),
        allowNull:false
    },
    address_user:{
        type:DataTypes.STRING(45),
        allowNull:false
    },
    personal_email_user:{
        type:DataTypes.STRING(100),
        allowNull:true
    },
    access_email_user:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    access_password_user:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    phone_number_user:{
        type:DataTypes.STRING(10),
        allowNull:true
    },
    active_state:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    last_access_date:{
        type:DataTypes.DATE,
        allowNull:true
    },
    last_access_ip_address:{
        type:DataTypes.STRING(45),
        allowNull:true
    },
    id_document_type:{
        type:DataTypes.INTEGER,
        allowNull:false
    },id_rol:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
};

const systemUserModel = sequelize.define(tableName,attributes,options);
module.exports = {systemUserModel};