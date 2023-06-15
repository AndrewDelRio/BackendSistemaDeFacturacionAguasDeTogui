const dbUserName = 'root';
const dbUserPassword = 'MYSQL123root';
const dbName = 'public_services_factory_togui_boy';
const dbHost = 'localhost';
const dbPort = '3306';

process.env.JWT_SIGNATURE = process.env.JWT_SIGNATURE || 'developmenttokensignature';
process.env.JWT_EXP_TIME = process.env.JWT_EXP_TIME || '10h';

module.exports = {dbUserName,dbUserPassword,dbName,dbHost,dbPort};