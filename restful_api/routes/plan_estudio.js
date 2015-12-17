var mssql   = require("mssql");

function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection) {

    router.get("/getPlanesEstudio",function(req,res){
      var request = new mssql.Request(connection);
      request.execute('GetPlanesEstudio', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "PlanesEstudio" : recordset[0]});
      });
    })

    router.post("/createPlanEstudio",function(req,res){
      var request = new mssql.Request(connection);
      request.input('codigo', mssql.VarChar(mssql.MAX), req.body.codigo);
      request.input('nombre', mssql.VarChar(mssql.MAX), req.body.nombre);
      request.input('emailUsuario', mssql.VarChar(mssql.MAX), req.body.email_usuario);
      request.input('ipUsuario', mssql.VarChar(mssql.MAX), req.ip);
      request.execute('CreatePlanEstudio', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "PlanesEstudio" : recordset});
      });
    })

    router.put("/updatePlanEstudio",function(req,res){
      var request = new mssql.Request(connection);
      request.input('codigoOriginal', mssql.VarChar(mssql.MAX), req.body.codigo_original);
      if (req.body.codigo){
        request.input('codigo', mssql.VarChar(mssql.MAX), req.body.codigo);
      }
      if (req.body.nombre){
        request.input('nombre', mssql.VarChar(mssql.MAX), req.body.nombre);
      }
      request.input('emailUsuario', mssql.VarChar(mssql.MAX), req.body.email_usuario);
      request.input('ipUsuario', mssql.VarChar(mssql.MAX), req.ip);
      request.execute('UpdatePlanEstudio', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "PlanesEstudio" : recordset});
      });
    })

}

module.exports = REST_ROUTER;
