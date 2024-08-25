module.exports = app => {
    
    const users=require("../controllers/user.controller");

    var router =require("express").Router();
  
    router.post("/", users.create);

    router.get("/", users.findAll);

    router.get("/:id", users.findOne);
    
    app.use('/api/users', router);
  };