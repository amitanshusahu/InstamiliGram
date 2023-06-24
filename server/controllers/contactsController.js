const ContactModel = require('../models/ContactsModel');
const UserProfile = require('../models/userProfileModel');

module.exports.createContact = async (req, res) => {
  const { username } = req.body;

  if (username == req.user.username) {
    let user = await ContactModel.findOne({ username });

    if (!user) {
      let contacts = await ContactModel.create({ username, contacts: [] });
      if (contacts) res.status(200).json({ status: true, contacts });
      else res.status(500).json({ status: false, msg: "Error Creating Contacts" })
    }
    else res.status(400).json({ status: false, msg: "Username already exists" });

  }
  else res.status(400).json({ status: false, msg: "Username Is Not Authorized" })
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

        // get req.user contacts
        contacts = await ContactModel.findOne({ username: req.user.username });
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

  // get req.user contacts
  contacts = await ContactModel.findOne({ username: req.user.username });
  if (updatedContacts) res.status(200).json({ status: true, contacts });
  else res.status(500).json({ status: false, msg: "faied to updateContact" });

}