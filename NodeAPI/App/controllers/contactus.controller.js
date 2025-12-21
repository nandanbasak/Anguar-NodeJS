const ConstactUs = require("../models/contactus.model");



exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            Message: "Content cannot be empty",
        });
    }
console.log("Add Feedback "+ req);
    const constactUs = new ConstactUs({
        user_id: req.boby.user_id,
        coments: req.boby.coments,
        first_name: req.boby.first_name,
        last_name: req.boby.last_name,
        email: req.boby.email,
        phone: req.boby.phone,
        comments_on: req.boby.comments_on

    });

    ConstactUs.create(constactUs, (err, result) => {
        if (err) {
            res.status(500).send({
                message: res.Message || "Some error occured while creating feedback",
            });
        } else res.send(result);
    });
};
exports.findAll = (req, res) => {
    const userid = req.query.user_id;
  
    ConstactUs.getAll(userid, (err, result) => {
      if (err) {
        res.status(500).send({
          message: res.Message || "Some error occured while fetching all feedback",
        });
      } else res.send(result);
    });
  };