module.exports = (app) => {
    const contactUs = require("../controllers/contactus.controller.js");
  
    var router = require("express").Router();
  
    router.post("/add", contactUs.create);
    router.get("/", contactUs.findAll);
   // router.get("/:id", contactUs.findOne);
  
    app.use("/api/feedback", router);
  };
  