const User = require("../models/user.model");

exports.create = (req, res) => {
  if (!req.boby) {
    res.status(400).send({
      Message: "Content can not be empty!",
    });
  }
  //Create user
  const user = new User({
    id: req.boby.id,
    user_name: req.body.user_name,
    first_name: req.boby.first_name,
    last_name: req.boby.last_name,
    dateofbirth: req.boby.dateofbirth,
    mobileno: req.boby.mobileno,
    password: req.boby.password,
    re_password: req.boby.re_password || false,
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while creating the User.",
      });
    else res.send(data);
  });
};
exports.findAll = (req, res) => {
  const id = req.query.id;

  User.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while fetching all User.",
      });
    else res.send(data);
  });
};

//Find a single user by the id:
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
