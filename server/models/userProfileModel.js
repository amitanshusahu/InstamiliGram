const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    dp: {
        type : String,
    },
    bio: {
        type: String,
        max: 200
    }
});

module.exports = mongoose.model("UserProfile", userProfileSchema);