 const mysql = require("mysql");
const dbConfig = require("./db.config.js");

// Create a connection to the database
const connectToLocal = mysql.createConnection({
  host: dbConfig.poolLocal.HOST,
  user: dbConfig.poolLocal.USER,
  password: dbConfig.poolLocal.PASSWORD,
  database: dbConfig.poolLocal.DB,
  port:dbConfig.poolLocal.PORT
});
const connectToServer = mysql.createConnection({
  host: dbConfig.poolOnServer.HOST,
  user: dbConfig.poolOnServer.USER,
  password: dbConfig.poolOnServer.PASSWORD,
  database: dbConfig.poolOnServer.DB,
  port:dbConfig.poolOnServer.PORT
});
// open the MySQL connection
connectToServer.connect(error => {
  if (error) console.log(error);
  //console.log("Successfully connected to the database.");
});

module.exports = {connectToServer,connectToLocal};