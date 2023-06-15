const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'control_log';
const options = {};
const attributes = {
    id_control_log:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    manipulated_table_name:{
        type: DataTypes.STRING(45),
        allowNull:false

    },
    affected_table_record_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    operation_type:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    operation_date:{
        type: DataTypes.DATETIME,
        allowNull:false
    },
    id_system_user:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
};

const controlLogModel = sequelize.define(tableName,attributes,options);
module.exports = {controlLogModel};

