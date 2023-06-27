const ContactModel = require('../models/ContactsModel');
const UserProfile = require('../models/userProfileModel');
const FolloweModel = require('../models/FollowerModel');
const FollowerModel = require('../models/FollowerModel');
const NotificationModel = require('../models/NotificationModel');


module.exports.createContact = async (req, res) => {
  const { username } = req.body;

  if (username == req.user.username) {
    let user = await ContactModel.findOne({ username });

    if (!user) {
      let contacts = await ContactModel.create({ username, contacts: [] });

      {
        // create followers collection
        let isfollowerModal = await FollowerModel.findOne({ username });
        if (!isfollowerModal) await FolloweModel.create({ username, followers: [] })
      }

      {
        // create notification collection
        let requser = await UserProfile.findOne({username: req.user.username});
        let isNotificationModal = await NotificationModel.findOne({ username });
        if (!isNotificationModal) NotificationModel.create({ username, notification: [{
          username: req.user.username,
          userdp: requser.dp,
          body: {
            title: "New Account Created!!",
            body: "Welcome to instaminilgram"
          }
        }] })
      }

      if (contacts) res.status(200).json({ status: true, contacts });
      else res.status(500).json({ status: false, msg: "Error Creating Contacts" })
    }
    else res.status(400).json({ status: false, msg: "Username already exists" });

  }
  else res.status(400).json({ status: false, msg: "Username Is Not Authorized" })
}

module.exports.getContacts = async ( req, res ) => {
  let contacts = await ContactModel.findOne({ username: req.user.username});

  
  if ( contacts ) res.status(200).json({status: true, contacts});
  else res.status(500).json({status: false, msg: "Error getting contacts"});
}

module.exports.follow = async (req, res) => {
  try {
    const { follow } = req.body;

    // get req.user contacts
    let contacts = await ContactModel.findOne({ username: req.user.username });
    contacts = contacts.contacts;

    let unique = true;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].username == follow) {
        unique = false;
        break;
      }
    }

    if (contacts && unique) {
      // get follow user details
      let user = await UserProfile.findOne({ username: follow });

      if (user) {
        // add follow user to the contacs of req.user
        contacts.push({
          username: user.username,
          dp: user.dp
        })
        // updated req.user contacts with the followed
        let updatedContacts = await ContactModel.findOneAndUpdate({ username: req.user.username }, { contacts })

        // get req.user updated ontacts
        contacts = await ContactModel.findOne({ username: req.user.username });

        {
          // update followers of follow user
          let followUser = await FolloweModel.findOne({ username: follow });
          if (followUser) {
            let followerArr = followUser.followers;
            followerArr.push(req.user.username);
            await FolloweModel.findOneAndUpdate({ username: follow }, { followers: followerArr })
          }
        }
        
        {
          //update notification of follow user
          let requser = await UserProfile.findOne({username: req.user.username});
          let notification = await NotificationModel.findOne({ username: follow });
          if (notification) {
            notification = notification.notification;
            notification.push({
              username: req.user.username,
              userdp: requser.dp,
              body: {
                title: "New Follower!",
                body: `${req.user.username} just started following you`
              }
            })
            await NotificationModel.findOneAndUpdate({ username: follow }, { notification });
            console.log("Notification sent to", follow);
          }
        }

        if (updatedContacts) res.status(200).json({ status: true, contacts });
        else res.status(500).json({ status: false, msg: "faied to updateContact" });
      }
    }
    else res.status(400).json({ status: false, msg: "Invalid request" });

  }
  catch (e) {
    console.log(e);
  }

}

module.exports.isFollowing = async (req, res) => {
  const { follow } = req.body;

  let contacts = await ContactModel.findOne({ username: req.user.username });
  contacts = contacts.contacts;
  let isFollowing = false;

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].username == follow) {
      isFollowing = true;
      break;
    }
  }

  if (isFollowing) res.status(200).json({ status: true });
  else res.status(200).json({ status: false });
}

module.exports.unfollow = async (req, res) => {
  const { unfollow } = req.body;
  let contacts = await ContactModel.findOne({ username: req.user.username });
  contacts = contacts.contacts;

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].username == unfollow) {
      yo = contacts.splice(i, 1);
    }
  }

  let updatedContacts = await ContactModel.findOneAndUpdate({ username: req.user.username }, { contacts })

  let follwerListOfUnfollow = await FolloweModel.findOne({ username: unfollow });
  follwerListOfUnfollow = follwerListOfUnfollow.followers;
  if (follwerListOfUnfollow) {
    const index = follwerListOfUnfollow.indexOf(req.user.username);
    if (index > -1) {
      follwerListOfUnfollow.splice(index, 1);
    }

    await FolloweModel.findOneAndUpdate({ username: unfollow }, { followers: follwerListOfUnfollow })
  }

  // get req.user contacts
  contacts = await ContactModel.findOne({ username: req.user.username });
  if (updatedContacts) res.status(200).json({ status: true, contacts });
  else res.status(500).json({ status: false, msg: "faied to updateContact" });

}

module.exports.getFollowers = async (req, res) => {
  let followers = await FolloweModel.findOne({ username: req.user.username });
  followers = followers.followers;

  if (followers) res.status(200).json({ status: true, followers });
  else res.status(400).json({ status: false, msg: "Erro getting followers" });
}

module.exports.getNotification = async (req, res) => {
  let notification = await NotificationModel.findOne({ username: req.user.username });
  notification = notification.notification;

  if (notification) res.status(200).json({ status: true, notification });
  else res.status(400).json({ status: false, msg: "Error getting notifications" });
}