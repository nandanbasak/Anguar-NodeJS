const sqldb = require('../Config/db');

const contactUs = function (objContact) {
    this.user_id = objContact.user_id;
    this.coments = objContact.coments;
    this.first_name = objContact.first_name;
    this.last_name = objContact.last_name;
    this.email = objContact.email;
    this.phone = objContact.phone;
    this.comments_on = objContact.comments_on;
};

contactUs.create = (objCont, res) => {
    console.log(`create ContactUs : ${JSON.stringify(objCont)}` )
    const Qry = "insert into feedback_master SET ?";
    sqldb.connectToServer.query(Qry, objCont, (error, response) => {
        if (error) {
            console.log(`Error while add feedback: ${error}`);
            res(error, null);
            return;
        }
        console.log(`Thanks for feedback ${response.user_id}`);
        res(null, { user: response.user_id, ...objCont });
    });
}

contactUs.getAll = (newfeed, res) => {
    const Qry = "select * from feedback_master"
    if (newfeed) {
        Qry += ` where user_id=${newfeed}`;
    }
    sqldb.connectToServer.query(Qry, (err, response) => {
        if (err) {
            console.log("Error gelAll feedback: ", err);
            res(null, err);
            return;
        }
        console.log("feedback : ", response);
        res(null, response);
    });
}
module.exports=contactUs;