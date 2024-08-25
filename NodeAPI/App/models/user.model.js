const sql = require("../Config/db.js");

// constructor
const User = function(user) {
  this.id = user.id;
  this.user_name = user.user_name;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.dateofbirth = user.dateofbirth;
  this.mobileno = user.mobileno;
  this.password = user.password;
  this.re_password = user.re_password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO t_user_master SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("user created: ", { id: res.id, ...newUser });
    result(null, { id: res.id, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM t_user_master WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (title, result) => {
  let query = "SELECT * FROM t_user_master";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user: ", res);
    result(null, res);
  });
};

User.getAllPublished = result => {
  sql.query("SELECT * FROM t_user_master WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE t_user_master SET user_name = ?, first_name = ?, last_name = ?,dateofbirth = ? ,  mobileno= ?,  password= ?,  re_password= ? WHERE id = ?",
    [
        user.user_name,
        user.first_name,
        user.last_name,
        user.dateofbirth,
        user.mobileno,
        user.password,
        user.re_password,
        id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM t_user_master WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM t_user_master", (err, res) => {
    if (err) {
      console.log("error: ", err);
       (null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user`);
    result(null, res);
  });
};

module.exports = User;