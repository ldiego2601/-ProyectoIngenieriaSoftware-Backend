var mssql   = require("mssql");

function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection) {

    router.get("/getFranjasHorarias/:codigo_plan_estudio",function(req,res){
      var request = new mssql.Request(connection);
      request.input('codigoPlanEstudio', mssql.VarChar(mssql.MAX), req.params.codigo_plan_estudio);
      request.execute('GetFranjasHorarias', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "FranjasHorarias" : recordset[0]});
      });
    })

    router.post("/createFranjaHoraria",function(req,res){
      var request = new mssql.Request(connection);
      request.input('codigoPlanEstudio', mssql.VarChar(mssql.MAX), req.body.codigo_plan_estudio);
      request.input('dias', mssql.VarChar(mssql.MAX), req.body.dias);
      request.input('horaInicio', mssql.VarChar(mssql.MAX), req.body.hora_inicio);
      request.input('horaFin', mssql.VarChar(mssql.MAX), req.body.hora_fin);
      request.input('emailUsuario', mssql.VarChar(mssql.MAX), req.body.email_usuario);
      request.input('ipUsuario', mssql.VarChar(mssql.MAX), req.ip);
      request.execute('CreateFranjaHoraria', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "FranjasHorarias" : recordset});
      });
    })

    router.put("/updateFranjaHoraria",function(req,res){
      var request = new mssql.Request(connection);
      request.input('idFranjaHoraria', mssql.INT, req.body.id_franja_horaria);
      if (req.body.codigo_plan_estudio){
        request.input('codigoPlanEstudio', mssql.VarChar(mssql.MAX), req.body.codigo_plan_estudio);
      }
      if (req.body.dias){
        request.input('dias', mssql.VarChar(mssql.MAX), req.body.dias);
      }
      if (req.body.hora_inicio){
        request.input('horaInicio', mssql.VarChar(mssql.MAX), req.body.hora_inicio);
      }
      if (req.body.hora_fin){
        request.input('horaFin', mssql.VarChar(mssql.MAX), req.body.hora_fin);
      }
      request.input('emailUsuario', mssql.VarChar(mssql.MAX), req.body.email_usuario);
      request.input('ipUsuario', mssql.VarChar(mssql.MAX), req.ip);
      request.execute('UpdateFranjaHoraria', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "FranjasHorarias" : recordset});
      });
    })

    router.delete("/deleteFranjaHoraria",function(req,res){
      var request = new mssql.Request(connection);
      request.input('id', mssql.VarChar(mssql.MAX), req.body.id);
      request.input('emailUsuario', mssql.VarChar(mssql.MAX), req.body.email_usuario);
      request.input('ipUsuario', mssql.VarChar(mssql.MAX), req.ip);
      request.execute('DeleteFranjaHoraria', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "FranjasHorarias" : recordset});
      });
    })

}

module.exports = REST_ROUTER;
