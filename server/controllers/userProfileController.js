const UserProfile = require('../models/userProfileModel');

module.exports.createUserProfile = async (req, res) => {
  let { username, bio, dp} = req.body;

  if (username == req.user.username) {
    let user = await UserProfile.findOne({ username });

    if (!user) {
      let createdUser = await UserProfile.create({ username, bio, dp});
      res.json({ status: true, createdUser });
      console.log(" \n Uploaded an Image of", ((dp.length) * (3 / 4) / 1000).toFixed(1), "Kb \n");
    } else {
      res.status(400).json({ status: false, msg: "user already exist" })
    }
  }
  else {
    res.status(401).json({ status: false, msg: "wrong user" });
  }

}

module.exports.getUserProfile = async (req, res) => {
  let { username } = req.body;

  let user = await UserProfile.findOne({ username });

  if (user) res.status(200).json({ status: true, user });
  else res.status(400).json({ status: false, msg: "No Such User Found" });

}