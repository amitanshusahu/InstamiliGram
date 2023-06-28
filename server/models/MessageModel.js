const mongoose = require("mongoose");

const msgShema = new mongoose.Schema({
  from: {
    type: String
  },
  to: {
    type: String
  },
  msg: {
    type: String
  },
  date: {
    type: Date,
    default: () => Date()
  }
})

const msgModel = mongoose.model("msgModel", msgShema);

module.exports = msgModel;