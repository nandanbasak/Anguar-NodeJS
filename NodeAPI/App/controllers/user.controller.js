const User = require("../models/user.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      Message: "Content can not be empty!",
    });
  }
  //Create user
  const user = new User({
    //id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dateofbirth: req.body.dateofbirth,
    mobileno: req.body.mobileno,
    password: req.body.password,
    re_password: req.body.re_password || false,
    role: req.body.role,
    email: req.body.email,
    gender: req.body.gender
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while creating the User.",
      });
    else res.send(data);
  });
};
exports.Login = (req, res) => {  
  if (!req.body) {
    res.status(400).send({
      Message: "Content can not be empty!",
    });
  }
  //Create user
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.login(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while login User.",
      });
    else res.send(data);
  })
}
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
