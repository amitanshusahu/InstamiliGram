const mongoose = require("mongoose");

const postScema = new mongoose.Schema({

  username: {
    type: String
  },
  date: {
    type: Date,
    default: () => Date()
  },
  userImg: {
    type: String
  },
  postImg: {
    type: String
  },
  body: {
    title: {
      type: String
    },
    body:{
      type: String
    }
  }

});

let PostModel = mongoose.model("PostModel", postScema);

module.exports = PostModel;