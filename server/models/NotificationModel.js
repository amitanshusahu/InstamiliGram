const mongoose = require("mongoose");

const notificationShema = new mongoose.Schema({
    username: {
        type: String
    },
    notification: [{
        username: {
            type: String
        },
        userdp: {
            type: String
        },
        body: {
            title: {
                type: String
            },
            body: {
                type: String
            }
        },
        date: {
            type: Date,
            default: () => Date()
        },
    }]
})

module.exports = new mongoose.model("notificationModel", notificationShema);