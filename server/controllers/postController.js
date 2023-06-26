const contactModel = require('../models/ContactsModel');
const PostModel = require('../models/PostModel');
const UserProfile = require('../models/userProfileModel');

module.exports.savepost = (req, res) => {
  let { username, userImg, postImg, body } = req.body;

  if (req.user.username == username) {
    PostModel.create({ username, userImg, postImg, body })
      .then((post) => {
        res.status(200).json({ status: true});
        console.log("Post saved to the db");
      })
      .catch(er => {
        res.status(500).json({ status: false, msg: er })
        console.log("Save Post Err", er);
      })
  }
  else {
    res.json({ status: false, msg: "Invalid Username" });
    console.log("did no save post invalid username")
  }

};


module.exports.getFeed = async (req, res) => {
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

  let posts = await PostModel.find({ username: { $in: usernameArr } })
  if (posts.length > 0) res.status(200).json({ status: true, posts });
  else res.status(400).json({ status: false, msg: 'No Posts Found!!' });
}

module.exports.userPost = async (req, res) => {
  try {
    let { username } = req.body;

    let posts = await PostModel.find({ username });
    if (posts.length > 0) res.status(200).json({ status: true, posts });
    else res.status(400).json({ status: false, msg: 'No Posts Found!!' });
  }
  catch (e) { console.log(e) }
}