var mssql   = require("mssql");

function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection) {
    /*router.get("/",function(req,res){
      res.json({"Message" : "Hello World !"});
    })*/

    /*router.get("/getUsuarios",function(req,res){
      var request = new mssql.Request(connection);
      request.query('select * from usuarios', function(err, recordset) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        res.status(200).json({"Error" : false, "Usuarios" : recordset});
      });
    })*/

    router.get("/getUsuarios",function(req,res){
      var request = new mssql.Request(connection);
      request.execute('GetUsuarios', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "Usuarios" : recordset});
      });
    })

    router.post("/createUsuario",function(req,res){
      var request = new mssql.Request(connection);
      request.input('Usuario', mssql.VarChar(25), req.body.usuario);
      request.input('Contraseña', mssql.VarChar(25), req.body.contraseña);
      request.execute('CreateUsuario', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "Usuarios" : recordset});
      });
    })
}

module.exports = REST_ROUTER;
