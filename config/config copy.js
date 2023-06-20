const dbUserName = 'adm_db_ATSAESP';
const dbPassword = 'adminATSAESP';
const dbName = 'public_services_factory_togui_boy';
const dbHost = '127.0.0.1';
const dbPort = '3306';

process.env.JWT_SIGNATURE = process.env.JWT_SIGNATURE || 'developmenttokensignature';
process.env.JWT_EXP_TIME = process.env.JWT_EXP_TIME || '1h';

module.exports = {dbUserName,dbPassword,dbName,dbHost,dbPort};