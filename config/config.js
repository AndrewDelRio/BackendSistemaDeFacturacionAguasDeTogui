const dbUserName = 'uba4zcfwjqw1hrj9';
const dbPassword = '7ErnP9DLdd63gqhaBP1l';
const dbName = 'bry0dpnjnoqepbslink4';
const dbHost = 'bry0dpnjnoqepbslink4-mysql.services.clever-cloud.com';
const dbPort = '3306';

process.env.JWT_SIGNATURE = process.env.JWT_SIGNATURE || 'developmenttokensignature';
process.env.JWT_EXP_TIME = process.env.JWT_EXP_TIME || '1h';

module.exports = {dbUserName,dbPassword,dbName,dbHost,dbPort};