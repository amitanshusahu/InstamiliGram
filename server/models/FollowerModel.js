const mongoose = require('mongoose');

const followerShcma = new mongoose.Schema({
    username: {
        type: String
    },
    followers: []
});

module.exports = mongoose.model("FolloweModel", followerShcma);