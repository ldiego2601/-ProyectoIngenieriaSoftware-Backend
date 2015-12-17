var mssql   = require("mssql");

function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection) {

    router.get("/getJornadasLaborales",function(req,res){
      var request = new mssql.Request(connection);
      request.execute('GetJornadasLaborales', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "JornadasLaborales" : recordset[0]});
      });
    })

    router.post("/createJornadaLaboral",function(req,res){
      var request = new mssql.Request(connection);
      request.input('porcentaje', mssql.TinyInt, req.body.porcentaje);
      request.input('emailUsuario', mssql.VarChar(mssql.MAX), req.body.email_usuario);
      request.input('ipUsuario', mssql.VarChar(mssql.MAX), req.ip);
      request.execute('CreateJornadaLaboral', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "JornadasLaborales" : recordset});
      });
    })

    router.put("/updateJornadaLaboral",function(req,res){
      var request = new mssql.Request(connection);
      request.input('id', mssql.VarChar(mssql.MAX), req.body.id);
      request.input('porcentaje', mssql.VarChar(mssql.MAX), req.body.porcentaje);
      request.input('emailUsuario', mssql.VarChar(mssql.MAX), req.body.email_usuario);
      request.input('ipUsuario', mssql.VarChar(mssql.MAX), req.ip);
      request.execute('UpdateJornadaLaboral', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "JornadasLaborales" : recordset});
      });
    })

    router.delete("/deleteJornadaLaboral",function(req,res){
      var request = new mssql.Request(connection);
      request.input('id', mssql.VarChar(mssql.MAX), req.body.id);
      request.input('emailUsuario', mssql.VarChar(mssql.MAX), req.body.email_usuario);
      request.input('ipUsuario', mssql.VarChar(mssql.MAX), req.ip);
      request.execute('DeleteJornadaLaboral', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "JornadasLaborales" : recordset});
      });
    })

}

module.exports = REST_ROUTER;
