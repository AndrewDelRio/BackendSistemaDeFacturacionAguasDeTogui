const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Document_types';
const options = {};
const attributes = {
    id_document_type:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    document_type_name:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    document_type_abbreviation:{
        type:DataTypes.STRING(45),
        allowNull:false
    }
};

const documentTypeModel = sequelize.define(tableName,attributes,options);
module.exports = {documentTypeModel};