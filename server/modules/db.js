const mongoose = require("mongoose");

module.exports = function connectToMongo() {
    mongoose.connect(process.env.MONGO_URI)
    .then( () => {
        console.log("db connection sucess")
    })
    .catch( (e) => {
        console.log(e);
    });
}