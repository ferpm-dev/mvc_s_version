//La conexión a la base de datos se realiza en archivo aparte que luego es incluída en los diferentes modelos.

var mysql = require("mysql");
var settings = require("./settings.json");
var util = require("util");
var db;

function connectDatabase() {
  if (!db) {
    db = mysql.createConnection(settings);

    db.connect(function (err) {
      if (!err) {
        console.log("ya estas conectado a la base de datos");
      } else {
        console.log("error conectando a la base de datos");
      }
    });
  }
  db.query = util.promisify(db.query);
  return db;
}

module.exports = connectDatabase();
