const StatusModel = require("../models/StatusModel");
const contactModel = require('../models/ContactsModel');
const UserProfile = require('../models/userProfileModel');
const NotificationModel = require('../models/NotificationModel');

module.exports.uploadStatus = async (req, res) => {
  let { username, userImg, statusImg, body } = req.body;

  if (req.user.username == username) {
    
    let preStatus = await StatusModel.findOne({ username });
    if ( preStatus ){
      await StatusModel.deleteOne({username});
    }
    let userStatus = await StatusModel.create({ username, userImg, statusImg, body });
    if (userStatus) {
      res.status(200).json({ status: true});
      console.log("Status saved to the db");
    }
    else {
      res.status(500).json({ status: false, msg: er })
      console.log("Saveing Status Err", er);
    }
  }
  else {
    res.json({ status: false, msg: "Invalid Username" });
    console.log("did no save post invalid username")
  }

}

module.exports.getStatus = async (req, res) => {
  let contacts = await contactModel.findOne({ username: req.user.username });
  contacts = contacts.contacts;
  let user = await UserProfile.findOne({ username: req.user.username });
  contacts.push({
    username: user.username,
    dp: user.dp
  })

  let usernameArr = contacts.map(contact => {
    return contact.username;
  })

  let userStauts = await StatusModel.find({ username: { $in: usernameArr } })
  if (userStauts.length > 0) res.status(200).json({ status: true, userStauts });
  else res.status(400).json({ status: false, msg: 'No Status Found!!' });
}