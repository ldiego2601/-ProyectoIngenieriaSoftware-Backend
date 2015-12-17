var mssql   = require("mssql");

function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection) {

    router.get("/getCursos",function(req,res){
      var request = new mssql.Request(connection);
      request.execute('GetCursos', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "Cursos" : recordset[0]});
      });
    })

    router.post("/createCurso",function(req,res){
      var request = new mssql.Request(connection);
      request.input('codigoCurso', mssql.VarChar(mssql.MAX), req.body.codigo_curso);
      request.input('nombreCurso', mssql.VarChar(mssql.MAX), req.body.nombre_curso);
      request.input('codigoPlan', mssql.VarChar(mssql.MAX), req.body.codigo_plan);
      request.input('numCreditos', mssql.VarChar(mssql.MAX), req.body.num_creditos);
      request.input('codigoSede', mssql.VarChar(mssql.MAX), req.body.codigo_sede);
      request.input('emailUsuario', mssql.VarChar(mssql.MAX), req.body.email_usuario);
      request.input('ipUsuario', mssql.VarChar(mssql.MAX), req.ip);
      request.execute('CreateCurso', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "Cursos" : recordset});
      });
    })

    router.put("/updateCurso",function(req,res){
      var request = new mssql.Request(connection);
      request.input('idCurso', mssql.VarChar(mssql.MAX), req.body.id_curso);
      if (req.body.codigo_curso){
        request.input('codigoCurso', mssql.VarChar(mssql.MAX), req.body.codigo_curso);
      }
      if (req.body.nombre_curso){
        request.input('nombreCurso', mssql.VarChar(mssql.MAX), req.body.nombre_curso);
      }
      if (req.body.codigo_plan){
        request.input('codigoPlan', mssql.VarChar(mssql.MAX), req.body.codigo_plan);
      }
      if (req.body.num_creditos){
        request.input('numCreditos', mssql.VarChar(mssql.MAX), req.body.num_creditos);
      }
      if (req.body.codigo_sede){
        request.input('codigoSede', mssql.VarChar(mssql.MAX), req.body.codigo_sede);
      }
      request.input('emailUsuario', mssql.VarChar(mssql.MAX), req.body.email_usuario);
      request.input('ipUsuario', mssql.VarChar(mssql.MAX), req.ip);
      request.execute('UpdateCurso', function(err, recordset, returnvalue) {
        if (err) {
          console.error(err);
          res.status(500).json({"Error" : true, "Message" : err.message});
          return;
        }
        console.log(returnvalue);
        res.status(200).json({"Error" : false, "Cursos" : recordset});
      });
    })

}

module.exports = REST_ROUTER;
