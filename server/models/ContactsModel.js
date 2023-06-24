const mongoose = require("mongoose");

const contacts = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  contacts: []
})

let contactModel = mongoose.model("ContactModel", contacts);

module.exports = contactModel;