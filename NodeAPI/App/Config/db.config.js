// const poolLocal = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "Mysql@1234",
//   DB: "testdb",
//   PORT:3302
// };
const schemaName= {DB:"appdb"}; //Schema Name
const poolOnServer = {
  HOST: "192.168.1.9",
  USER: "vm",
  PASSWORD: "Mysql@1234",
  DB: "APPDB",
  PORT:3306
};
// const poolOnServer = {
//   HOST: "sql12.freesqldatabase.com",
//   USER: "sql12763557",
//   PASSWORD: "iDsrgikfrU",
//   DB: "sql12763557",
//   PORT:3306
// };
// To connect to your database use these details-
// Host: sql12.freesqldatabase.com
// Database name: sql12763557
// Database user: sql12763557
// Database password: iDsrgikfrU
// Port number: 3306


module.exports={poolOnServer,schemaName};