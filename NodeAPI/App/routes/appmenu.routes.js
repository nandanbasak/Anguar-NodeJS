module.exports = (app) => {
  const menuItems = require("../controllers/appmenu.controller.js");

  var router = require("express").Router();

  router.post("/", menuItems.create);
  router.get("/", menuItems.findAll);
  router.get("/:id", menuItems.findOne);

  app.use("/api/menuitems", router);
};
