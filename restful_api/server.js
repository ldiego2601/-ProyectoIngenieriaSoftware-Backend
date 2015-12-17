var express = require("express");
var mssql   = require("mssql");
var config = {
    user: 'SA',
    password: 'Proyecto2015',
    server: 'localhost\\DEVELOPMENT', // You can use 'localhost\\instance' to connect to named instance
    database: 'SistemaAdministracionDatosCargaAcademica',
}
var connection = new mssql.Connection(config); //cp = connection pool
var bodyParser  = require("body-parser");
var rest = require("./routes/rest_api.js");
var test = require("./routes/test.js");
var plan_estudio = require("./routes/plan_estudio.js");
var sede = require("./routes/sede.js");
var app  = express();

function REST(){
    var self = this;
    self.connectMssql();
};

REST.prototype.connectMssql = function() {
    var self = this;
    connection.connect().then(function(connection) {
      console.log("conexión correcta a sql");
      self.configureExpress(connection);
  }).catch(function(err) {
    self.stop(err);
  });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/', router);
      var rest_router = new rest(router,connection);
      var test_router = new test(router,connection);
      var plan_estudio_router = new plan_estudio(router,connection);
      var sede_router = new sede(router,connection);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("El servidor esta corriendo en el puerto 3000");
      });
}

REST.prototype.stop = function(err) {
    console.error("Error de conexión a sql", err);
    process.exit(1);
}

new REST();
