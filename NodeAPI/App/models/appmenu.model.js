const sql = require("../Config/db.js");

const menuItems = function (items) {
  this.menu_code = items.menu_code;
  this.menu_name = items.menu_name;
  this.created_on = items.created_on;
  this.created_by = items.created_by;
  this.updated_on = items.updated_on;
  this.owner_code = items.owner_code;
  this.status = items.status;
  this.description = items.description;
};

menuItems.create = (newItems, results) => {
  sql.query("insert into t_menu_items SET ?", newItems, (err, res) => {
    if (err) {
      console.log("Error Menu Items Create: ", err);
      results(err, null);
      return;
    }
    console.log("Menu Item Create:", newItems);
    results(null, { menucode: res.menu_code, ...newItems });
  });
};

menuItems.getAll = (menuName, result) => {
  let query = "SELECT * FROM t_menu_items";

  if (menuName) {
    query += ` WHERE title LIKE '%${menuName}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error gelAll menu: ", err);
      result(null, err);
      return;
    }
    console.log("Menu Items: ", res);
    result(null, res);
  });
};

menuItems.findById = (id, result) => {
  sql.query(`SELECT * FROM t_menu_items WHERE MENU_CODE = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Menu Items: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Menu Items with the id
    result({ kind: "not_found" }, null);
  });
};


module.exports = menuItems;
