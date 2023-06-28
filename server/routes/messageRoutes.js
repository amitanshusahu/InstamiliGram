const router = require('express').Router();
const { protect } = require('../modules/jwt');
const messageController = require("../controllers/messageController");
const { saveMessage, getMessage } = messageController;

router.post('/savemsg', protect, saveMessage);
router.post('/getmsg', protect, getMessage);

module.exports = router;