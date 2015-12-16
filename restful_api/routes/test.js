var mssql   = require("mssql");

function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection) {
    router.get("/",function(req,res){
      console.log(req.ip);
      res.json({"Message" : "Hello World !"});
    })
}

module.exports = REST_ROUTER;
