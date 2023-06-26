const mongoose = require("mongoose");

const statusScema = new mongoose.Schema({

  username: {
    type: String
  },
  userImg: {
    type: String
  },
  statusImg: {
    type: String
  },
  body: {
    type: String
  }

});

let StatusModel = mongoose.model("StatusModel", statusScema);

module.exports = StatusModel;