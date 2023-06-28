const MessageModel = require('../models/MessageModel');

module.exports.saveMessage = async ( req, res ) => {
  const { from , to, msg } = req.body;

  let msgStat = await MessageModel.create({ from, to, msg});

  if (msgStat) res.status(200).json({status: true});
  else res.status(500).json({status: false, msg: "Error saveing the message"});
}

module.exports.getMessage = async (req, res) => {
  const { from, to } = req.body;
  
  const msg = await MessageModel.find({ from, to});
  if ( msg ) res.status(200).json({status: true, msg});
  else res.status(500).json({status: false, msg: "Error getting message"})
}