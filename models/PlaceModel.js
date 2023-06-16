const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'places';
const options = {};
const attributes = {
    id_place:{
        type: DataTypes.STRING(15),
        primaryKey: true,
        allowNull:false,
        autoIncrement:false
    },
    name_place:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    abbreviation_place:{
        type:DataTypes.STRING(5),
        allowNull:false
    },
    type_place:{
        type:DataTypes.STRING(3),
        allowNull:false
    },
    DANE_place_code:{
        type:DataTypes.STRING(15),
        allowNull:false
    },
    IGAC_zone_place:{
        type:DataTypes.STRING(15),
        allowNull:false
    },
    sector_IGAC_place:{
        type:DataTypes.STRING(15),
        allowNull:false
    },
    id_location:{
        type:DataTypes.STRING(15),
        allowNull:true
    }
};

const placeModel = sequelize.define(tableName,attributes,options);
module.exports = {placeModel};