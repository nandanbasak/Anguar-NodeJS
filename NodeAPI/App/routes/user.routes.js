module.exports = app => {
    
    const users=require("../controllers/user.controller");

    var router =require("express").Router();
  
    router.post("/register", users.create);
    router.post("/login", users.Login);

    router.get("/all", users.findAll);

    router.get("/anyone:id", users.findOne);
    
    app.use('/api/users', router);
  };