 const mysql = require("mysql2");
const dbConfig = require("./db.config.js");

// Create a connection to the database
// const connectToLocal = mysql.createConnection({
//   host: dbConfig.poolLocal.HOST,
//   user: dbConfig.poolLocal.USER,
//   password: dbConfig.poolLocal.PASSWORD,
//   database: dbConfig.poolLocal.DB,
//   port:dbConfig.poolLocal.PORT,
//   connectTimeout: 10000 // Optional: Set a timeout for the connection
// });
const SchemaName = dbConfig.schemaName.DB; // Schema Name
const connectToServer = mysql.createConnection({
  host: dbConfig.poolOnServer.HOST,
  user: dbConfig.poolOnServer.USER,
  password: dbConfig.poolOnServer.PASSWORD,
  database: dbConfig.poolOnServer.DB,
  port:dbConfig.poolOnServer.PORT,
  connectTimeout: 10000 // Optional: Set a timeout for the connection
});
// open the MySQL connection
connectToServer.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
}
  console.log("Successfully connected to the database.");
});
// Handle unhandled error events for both connections
connectToServer.on('error', (err) => {
  console.error('MySQL Server connection error:', err);
});
// connectToLocal.on('error', (err) => {
//   console.error('MySQL Local connection error:', err);
// });
// module.exports = {connectToServer,connectToLocal};
module.exports = {connectToServer};