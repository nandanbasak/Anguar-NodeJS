const MenuItems = require("../models/appmenu.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      Message: "Content cannot be empty",
    });
  }

  const menuItem = new MenuItems({
    menu_code: req.boby.menu_code,
    menu_name: req.boby.menu_name,
    created_on: req.boby.created_on,
    created_by: req.boby.created_by,
    updated_on: req.boby.updated_on,
    owner_code: req.boby.owner_code,
    status: req.boby.status,
    description: req.boby.description,
  });

  MenuItems.create(menuItem, (err, items) => {
    if (err) {
      res.status(500).send({
        message: res.Message || "Some error occured while creating menu",
      });
    } else res.send(items);
  });
};

exports.findAll = (req, res) => {
  const menuName = req.query.menu_name;

  MenuItems.getAll(menuName, (err, result) => {
    if (err) {
      res.status(500).send({
        message: res.Message || "Some error occured while fetching all menu",
      });
    } else res.send(result);
  });
};

//Find a single Menu Items by the id:
exports.findOne = (req, res) => {
  MenuItems.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Menu with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Menu with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
