const FollowerModel = require('../models/FollowerModel');
const MessageModel = require('../models/MessageModel');
const NotificationModel = require('../models/NotificationModel');
const userProfileModel = require('../models/userProfileModel');

module.exports.saveMessage = async (req, res) => {
  const { to, msg } = req.body;

  let msgStat = await MessageModel.create({ from: req.user.username, to, msg });

  {
    // check for messages
    let followerArr = await FollowerModel.findOne({ username: req.user.username });
    followerArr = followerArr.followers;

    if ( followerArr.length == 0 ){
      //update notification of "to" user
      let requser = await userProfileModel.findOne({ username: req.user.username });
      let notification = await NotificationModel.findOne({ username: to });
      if (notification) {
        notification = notification.notification;
        console.log("notification")
        notification.push({
          username: req.user.username,
          userdp: requser.dp,
          body: {
            title: "New Message Request !",
            body: `start following ${req.user.username} to recive his messages`
          }
        })
        await NotificationModel.findOneAndUpdate({ username: to }, { notification });
        console.log("Notification sent to", to);
      }
    }
    
    for (let i = 0; i < followerArr.length; i++) {
      console.log(followerArr[i], to, followerArr[i] != to)
      if (followerArr[i] != to) {

        //update notification of "to" user
        let requser = await userProfileModel.findOne({ username: req.user.username });
        let notification = await NotificationModel.findOne({ username: to });
        if (notification) {
          notification = notification.notification;
          console.log("notification")
          notification.push({
            username: req.user.username,
            userdp: requser.dp,
            body: {
              title: "New Message Request !",
              body: `start following ${req.user.username} to recive his messages`
            }
          })
          await NotificationModel.findOneAndUpdate({ username: to }, { notification });
          console.log("Notification sent to", to);
        }
        
      }

    }
  }

  if (msgStat) res.status(200).json({ status: true });
  else res.status(500).json({ status: false, msg: "Error saveing the message" });
}

module.exports.getMessage = async (req, res) => {
  const { to } = req.body;

  const msg = await MessageModel.find({ $or: [{ from: req.user.username, to }, { from: to, to: req.user.username }] });
  if (msg) res.status(200).json({ status: true, msg });
  else res.status(500).json({ status: false, msg: "Error getting message" })
}