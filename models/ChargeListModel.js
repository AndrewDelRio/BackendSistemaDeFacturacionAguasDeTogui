const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Charges_list';
const options = {};
const attributes = {
    id_list_charge:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    date_of_charge:{
        type: DataTypes.DATE,
        allowNull:false
    },
    amount_units:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    observations:{
        type:DataTypes.STRING(2000),
        allowNull:true
    },
    id_charge:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_enrollment:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
};

const chargeListModel = sequelize.define(tableName,attributes,options);
module.exports = {chargeListModel};

